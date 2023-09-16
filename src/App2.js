import { useState } from "react";
import "./index.css";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [isOpen, setIsOpen] = useState(true);
  const [split, setSplit] = useState('A FRIEND')
  const [bill, setBill] = useState('');
  const [expense, setExpense] = useState('');
  
  function handleSetBill(e) {
    setBill(() => Number(e.target.value))
  }
  
  function handleSetExpense(e) {
    setExpense(() => Number(e.target.value))
  }

  function handleSplit(name) {
    setSplit(name)

    console.log(split);
  }
  

  function handleIsOpen() {
    setIsOpen(!isOpen)
  }

  function handleAddFriends(friend) {
    setFriends((friends) => [...friends, friend]);
  }

  
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList friends = {friends} onSplit = {handleSplit}/>
        <FormAddFriend onAddFriends = {handleAddFriends} friends = {friends} onIsOpen = {handleIsOpen} isOpen = {isOpen} bill={bill} expense={expense}/>
        {isOpen && <Button onClick = {handleIsOpen}>Add friend</Button>}
      </div>
      <FormSplitBill split = {split} bill={bill}  expense ={expense} onSetBill = {handleSetBill} onSetExpense={handleSetExpense}/>
    </div>
  );
}

function FriendsList({friends, onSplit}) {

  return (
    <ul>
      {friends.slice().map((friend) => (
        <Friend friend={friend} key={friend.id} onSplit = {onSplit}/>
      ))}
    </ul>
  );
}

function Friend({ friend,onSplit }) {
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>

      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}

      <Button onClick = {() => onSplit(friend.name)}>Select</Button>
    </li>
  );
}

function FormAddFriend({onAddFriends, friends, onIsOpen, isOpen, bill, expense}) {

  const [newName, setNewName] = useState('');
  const [newUrl, setNewUrl] = useState('');

  function handleSetNewName(e) {
    setNewName(() => e.target.value)
  }

  function handleSetNewUrl(e) {
    setNewUrl(() => e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();

    const friend = {
      id : newUrl,
      name : newName,
      image : `https://i.pravatar.cc/48?u=${newUrl}`,
      balance : bill-expense
    }

    onAddFriends(friend)
    onIsOpen();

    console.log(friends);

    setNewName('')
    setNewUrl('')

    
  }
  if (!isOpen) {
    return (
      <form className="form-add-friend" onSubmit={(e) => handleSubmit(e)}>
        <label>👩🏼‍🤝‍🧑🏽Friend name</label>
        <input type="text" value={newName} onChange={(e) => handleSetNewName(e)}/>
        <label>🖼 Image URL</label>
        <input type="text" value={newUrl} onChange={(e) => handleSetNewUrl(e)}/>
        <Button>Add</Button>
      </form>
    );
  }
  }

function Button({ children,onClick }) {


  
  return <button className="button" onClick={onClick}>{children}</button>;
}

function FormSplitBill({split,bill,expense,onSetBill,onSetExpense}) {

  const [isClicked, setIsClicked] = useState(true);

  // function handleIsClicked() {
  //   setIsClicked((isClicked) => !isClicked)
  // }
  

  return (
    <form className="form-split-bill">
      <h2>Split a bill with {split}</h2>
      <label>💵 BIll value</label>
      <input type="text" value={bill} onChange={(e) => onSetBill(e)}/>
      {isClicked ? <><label>🧑🏾 Your expense</label>
      <input type="text" value={expense} onChange={(e) => onSetExpense(e)}/></> : <><label>🧑🏾 Your expense</label>
      <input type="text" value={bill-expense} onChange={(e) => onSetExpense(e)}/></>}
      {!isClicked ? <><label>👩🏼‍🤝‍🧑🏽X's expense</label>
      <input type="text" value={expense}/></> : <><label>👩🏼‍🤝‍🧑🏽X's expense</label>
      <input type="text" value={bill-expense}/></>}
      <label>🤑 Who is paying the bill</label>
      <select>
        <option value="user">You</option>
        <option value="friend">{split}</option>
      </select>
      <Button onClick={() => {console.log(bill-expense);}}>Split bill</Button>
    </form>
  );
}
