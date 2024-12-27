import React, { useEffect, useState } from "react";
import ChatRoom from "./components/ChatRoom";
import Login from "./components/Login";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = sessionStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    user
      ? sessionStorage.setItem("user", JSON.stringify(user))
      : sessionStorage.removeItem("user");
  }, [user]);

  const [roomID,setroomID]=useState("");

  return (
    <div className="App">
      <div style={{ fontFamily: "Arial, sans-serif", textAlign: "center" }}>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                user ? (roomID ? <Navigate to="/chatroom" />:<h2>connecting to Chatroom...</h2>) :
                 <Login setUser={setUser} setroomID={setroomID}/>
              }
            />
            <Route path="/chatroom" element={<ChatRoom User={user} roomID={roomID}/>} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
