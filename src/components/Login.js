import React,{useState} from "react";

function Login({setUser}){
    const [userName,setUserName]=useState("");

    return(
        <div className="login">
            <h1 style={{backgroundColor:"lightblue"}}>Welcome to Chat App</h1>
            <input type="text" 
              placeholder="Enter your Name"
              value={userName}
              onChange={
                (e)=>{setUserName(e.target.value)}
              }
            />
            
            <button
            style={{marginLeft:"3px"}} 
            onClick={()=>{
                if(userName.trim())
                {
                    setUser(userName);
                }
                setUserName("");
            }}>Join Chat</button>
        </div>
    );
}

export default Login;