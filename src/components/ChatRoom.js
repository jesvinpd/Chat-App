import React, { useState, useEffect } from "react";
import TextBox from "./TextBox";
import {  query } from "firebase/database";
import { firestore } from "../firebase";
import { addDoc, collection, deleteDoc, getDocs, onSnapshot, orderBy } from "firebase/firestore";

function ChatRoom({ User ,roomID}) {
  const [messageArray, setMessageArray] = useState([]); //for firebase
  const msgref = collection(firestore, `Rooms/${roomID}/Messages`);
  

  useEffect(() => {
    function unsubscribe() {
      const q = query(msgref, orderBy("time", "asc"));
      console.log("useEffect");
      onSnapshot(
        q,
        (snapshot) => {
          const msgArray = snapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
          });
          setMessageArray(msgArray);
        },
        (error) => {
          console.error("Error with onSnapshot: ", error);
        }
      );

    }
    unsubscribe();
  
  }, []);

  //useEffect(() => console.log("useEffect"), [])

  const addMsg = async (message) => {
    if (message.trim()) {
      const msgData = { user: User,
                        text: message,
                        time: new Date().toISOString(),
                      };
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

 async function clearChat() {
        try{
          const snapshot = await getDocs(msgref);
          const deletePromises = snapshot.docs.map((e)=> {
            return deleteDoc(e.ref);
          });
          await Promise.all(deletePromises);
          setMessageArray([]);
          console.log("chat cleared successfully!");
        }
        catch(error){
           console.log("error occured on clearing chat: ",error);
        }
  };

  return (
    <>
      <h2 style={{ backgroundColor: "lightblue" }}> ChatRoom: "{roomID}" </h2>
      <h3 style={{ display: "flex", marginLeft: "50px", marginTop: "-45px" }}>
        User: {User}
      </h3>
      <br />
      <div className="chat-box">
        {messageArray.length === 0 ? (
          <h2>ChatBox is Empty !</h2>
        ) : (
          <>
          {
          messageArray.map((msg) => {
            const formatedtime = new Date(msg.time).toLocaleString();
            return (
              <p key={msg.id}>
                <strong>{msg.user}</strong>: {msg.text} 
                <br />
                <small
                style={{color:"grey"}}
                >{formatedtime}
                </small> 
              </p>
            );
          }) 
        }
          <button 
          style={{
            backgroundColor:"red",
            fontWeight:"bolder",
            marginBottom:"10px",
            cursor:"pointer"
          }}
          onClick={clearChat}> 
          Clear Chat
          </button>
          </>//should always return as one tag
        )}
      </div>

      <TextBox addMsg={addMsg} />
    </>
  );
}

export default ChatRoom;
