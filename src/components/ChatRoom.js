import React, { useState, useEffect } from "react";
import TextBox from "./TextBox";
import {  query } from "firebase/database";
import { firestore } from "../firebase";
import { addDoc, collection, onSnapshot, orderBy } from "firebase/firestore";

function ChatRoom({ User ,roomID}) {
  const [messageArray, setMessageArray] = useState([]); //for firebase
  const msgref = collection(firestore, `Rooms/${roomID}/Messages`);

  useEffect(() => {
    function unsubscribe() {
      const q = query(msgref, orderBy("time", "asc"));

      onSnapshot(q, (snapshot) => {
        const msgArray = snapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        setMessageArray(msgArray);
      });
    }

    return () => unsubscribe();
  }, []);

  const addMsg = async (message) => {
    if (message.trim()) {
      const msgData = { user: User, text: message, time: new Date() };
      try {
        await addDoc(msgref, msgData);
        console.log("data sended successfully");
      } catch (error) {
        console.log("An error occured in sending: ", error);
      }
    } else {
      console.log("Message can't be empty!");
    }
  };

  return (
    <>
      <h2 style={{ backgroundColor: "lightblue" }}> Room: "{roomID}" </h2>
      <h3 style={{display:"flex",marginLeft:"50px",marginTop:"-45px"}}>User: {User}</h3>
      <br />
      <div className="chat-box">
        {messageArray.length === 0 ? (
          <h2>ChatBox is Empty !</h2>
        ) : (
          messageArray.map((msg) => {
            return (
              <p key={msg.id}>
                <strong>{msg.user}</strong>: {msg.text}
              </p>
            );
          })
        )}
      </div>

      <TextBox addMsg={addMsg} />
    </>
  );
}

export default ChatRoom;
