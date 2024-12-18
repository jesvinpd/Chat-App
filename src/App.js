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

  return (
    <div className="App">
      <div style={{ fontFamily: "Arial, sans-serif", textAlign: "center" }}>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                user ? <Navigate to="/chatroom" /> : <Login setUser={setUser} />
              }
            />
            <Route path="/chatroom" element={<ChatRoom User={user} />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
