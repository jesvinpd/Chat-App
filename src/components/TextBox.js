import React,{useState} from "react";
import Button from "react-bootstrap/Button";

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
          style={{ width: "230px", padding: "5px", marginRight: "5px" }}
        />

        <Button 
        variant="secondary"
        onClick={() => sendHandler(message)}
        style={{cursor:"pointer",}}
        >Send</Button>
      </div>
    );
}

export default TextBox;