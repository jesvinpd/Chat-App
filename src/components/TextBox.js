import React,{useState} from "react";

function TextBox({addMsg}){
   
    const [message,setMessage]=useState("");

    function sendHandler(msg){
           if(msg.trim())
            {
                addMsg(msg);
            }
            setMessage("");
    }

    function pressedEnterKey(e){
        if(e.key==='Enter'){ //camel case should be used
            sendHandler(message);
        }
    }

    return (
      <div style={{ marginBottom: "10px" }} className="text-box">
        <input
          type="text"
          placeholder="Enter your message to send"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={pressedEnterKey}
          style={{ width: "180px", padding: "5px", marginRight: "5px" }}
        />

        <button onClick={() => sendHandler(message)}>Send</button>
      </div>
    );
}

export default TextBox;