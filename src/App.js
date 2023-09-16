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
  const [showAddFriend, setShowAddFriend] = useState(false)
  const [friends, setFriends] = useState(initialFriends)
  const [selectedFriend, setSelectedFriend] = useState(null)
  

 
  function handleSelection(friend) {
    setSelectedFriend(selectedFriend?.id === friend?.id ? null : friend)
    setShowAddFriend(false)
  }


  function handleAddFriends(friend) {
    setFriends((friends) => [...friends, friend])
  }

  

  function handleShowAddFriend () {
    setShowAddFriend((show) => !show)
    setSelectedFriend(null)
  }

  function handleBalance(updatedBalance) {
    console.log(updatedBalance);

    
  setFriends(friends.map((friend) => friend.id === selectedFriend.id ? {...friend, balance: updatedBalance} : friend))

  setSelectedFriend(null)
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList friends ={friends}  onSelection={handleSelection} selectedFriend={selectedFriend}/>
        {showAddFriend && <FormAddFriend onAddFriends={handleAddFriends} onShowAddFriends ={handleShowAddFriend}/>}
        <Button onClick ={handleShowAddFriend}>{showAddFriend ? 'Close' : 'Add friend'}</Button>
      </div>
      {selectedFriend && <FormSplitBill selectedFriend={selectedFriend} onBalance={handleBalance}/>}
    </div>
  );
}

function FriendsList({friends,onSelection, selectedFriend}) {

  return (
    <ul>
      {friends.map((friend) => (
        <Friend friend={friend} key={friend.id} onSelection={onSelection} selectedFriend={selectedFriend}/>
      ))}
    </ul>
  );
}

function Friend({ friend, onSelection, selectedFriend}) {
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

      <Button onClick={() => onSelection(friend)}>{selectedFriend === friend ? 'Close' : 'Select'}</Button>
    </li>
  );
}

function FormAddFriend({onAddFriends, onShowAddFriends}) {



  const id = Math.floor((Math.random()*10000));
  
  const [name, setName] = useState('')
  const [image, setImage] = useState(`https://i.pravatar.cc/48?u=${id}`)

  

  function handleAddName(e) {
    setName(() => e.target.value)
  }
  function handleAddImage(e) {
    setImage(() => e.target.value)
  }
  function handleSubmit(e) {
    e.preventDefault();
    if(!name || !image) return ;

    

    const friend = {
      name, image, id, balance: 0
    }

    onAddFriends(friend);

  setName('')
  setImage(`https://i.pravatar.cc/48?u=${id}`)
  onShowAddFriends(false)

  }

  return (
    <form className="form-add-friend" onSubmit={(e) => handleSubmit(e)}>
      <label>👩🏼‍🤝‍🧑🏽Friend name</label>
      <input type="text" value={name} onChange={(e) => handleAddName(e)}/>
      <label>🖼 Image URL</label>
      <input type="text" value={image} onChange={(e) => handleAddImage(e)}/>
      <Button>Add</Button>
    </form>
  );
}

function Button({ children,onClick }) {
  return <button className="button" onClick={onClick}>{children}</button>;
}

function FormSplitBill({selectedFriend, onBalance}) {



  const [bill, setBill] = useState("")
  const [paidbyUser, setPaidbyUser] = useState("")
  const [whoIsPaying, setWhoIsPaying] = useState("user")

  function handleWhoIsPaying(e) {
    setWhoIsPaying(e.target.value)
  }

  function handleBill(e) {
    setBill(Number(e.target.value))
  }
  function handlePaidbyUser(e) {
    setPaidbyUser(Number(e.target.value) > bill ? paidbyUser : Number(e.target.value))
  }

  const paidbyFriend = bill ? bill - paidbyUser : "";

  function handleSubmit(e) {
    e.preventDefault();
    if(!bill || !paidbyUser) return ;

    setBill('')
    setPaidbyUser("")

    if(whoIsPaying === "user") return onBalance(selectedFriend.balance + paidbyFriend)
    else return onBalance(selectedFriend.balance - paidbyUser)

    

  }

  return (
    <form className="form-split-bill" onSubmit={(e) => handleSubmit(e)}>
      <h2>Split a bill with {selectedFriend.name}</h2>
      <label>💵 BIll value</label>
      <input type="text" value={bill} onChange={(e) => handleBill(e)}/>
      <label>🧑🏾 Your expense</label>
      <input type="text" value={paidbyUser} onChange={(e) => handlePaidbyUser(e)}/>
      <label>👩🏼‍🤝‍🧑🏽{selectedFriend.name}'s expense</label>
      <input type="text" disabled value={paidbyFriend}/>
      <label>🤑 Who is paying the bill</label>
      <select value={whoIsPaying} onChange={(e) => handleWhoIsPaying(e)}>
        <option value='user'>You</option>
        <option value='friend'>{selectedFriend.name}</option>
      </select>
      <Button>Split bill</Button>
    </form>
  );
}
