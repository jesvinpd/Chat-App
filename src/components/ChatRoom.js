import React,{useState,useEffect} from "react";
import TextBox from "./TextBox";
import { onValue, push, ref } from "firebase/database";
import { dataBase } from "../firebase";

function ChatRoom({User}){
   
    const [messageArray,setMessageArray]=useState([]);//for firebase
    const msgref = ref(dataBase,'messages');

     useEffect(() => {
    
        onValue(msgref,(snapshot)=>{
              const data = snapshot.val();//convert raw to json
              if(data){
              const msgArray = Object.values(data);//converted to array of object attributes {msg1,msg2,..}
              setMessageArray(msgArray);
              }
        })
    },[]);

    const addMsg=(msg)=>{
        
       push(msgref,{user: User , text: msg});
       
    }

    return(
        <>

       <h2 style={{backgroundColor:"lightblue"}}> Chatroom of "{User}" </h2>
        <div className="chat-box">
            {
                (messageArray.length===0)?
                <h2>ChatBox is Empty !</h2>:
                (
                    messageArray.map(
                        (e)=>{
                            return(
                                <p>
                                    <strong>{e.user}</strong>: {e.text}
                                </p>
                            );
                        }
                    )
                )
            }
          
        </div>
        
        <TextBox addMsg={addMsg}/>

        </>
    );
}

export default ChatRoom;