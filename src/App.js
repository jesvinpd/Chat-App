import React,{useState} from 'react';
import ChatRoom from './components/ChatRoom';
import Login from './components/Login';

function App() {

  const [user, setUser] = useState("");
  
  return (
    <div className="App">

       <div style={{ fontFamily: "Arial, sans-serif", textAlign: "center" }}>
      {user ? <ChatRoom User={user} /> : <Login setUser={setUser} />}
    </div>

    </div>
  );
}

export default App;
