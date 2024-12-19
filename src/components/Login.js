
import {  arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { firestore } from "../firebase";

function Login({ setUser,roomID,setroomID }) {
  const [userName, setUserName] = useState("");
  const [RoomID,setRoomID] = useState("");

  async function connectRoom (Room_ID,username){
     const roomRef = doc(firestore, "Rooms", Room_ID);
     const roomSnapshot = await getDoc(roomRef);
     if(!roomSnapshot.exists()){
      await setDoc(roomRef,{
        users:[username]
      });

     }
     else{
      await updateDoc(roomRef,{
        users:arrayUnion(username)
      })
     }
      setroomID(Room_ID);
  }

  return (
    <div className="login">
      <h1 style={{ backgroundColor: "lightblue" }}>Welcome to Chat App</h1>
      <input
        type="text"
        placeholder="Enter your Name"
        value={userName}
        onChange={(e) => {
          setUserName(e.target.value);
        }}
        style={{ width: "105px", padding: "5px" }}
      />
      <br />
      <br />
      <input
        type="text"
        placeholder="Type the room name here..."
        value={RoomID}
        onChange={(e) => setRoomID(e.target.value)}
        style={{ width: "175px", padding: "5px" }}
      />
      <br />
      <br />
      <button
        style={{ alignSelf: "center" }}
        onClick={() => {
          if (userName.trim() && RoomID.trim()) {
            setUser(userName);
            connectRoom(RoomID, userName);
          }
          setUserName("");
          setRoomID("");
        }}
      >
        Join Chat
      </button>
    </div>
  );
}

export default Login;
