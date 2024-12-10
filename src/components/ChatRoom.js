import React,{useState} from "react";
import TextBox from "./TextBox";

function ChatRoom({User}){
   
    const [msgs,setMsgs]=useState([]);
    const [Message,setMessage]=useState([]);

    const addMsg=(message)=>{
       setMsgs([...msgs,{user: User , text: message}]);
       
    }

    return(
        <>

       <h2 style={{backgroundColor:"lightblue"}}> Chatroom of "{User}" </h2>
        <div className="chat-box">
            {
                (msgs.length===0)?
                <h2>ChatBox is Empty !</h2>:
                (
                    msgs.map(
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