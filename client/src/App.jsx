import "./App.css";
import { io } from "socket.io-client";
import { useState } from "react";
import Chat from "./components/Chat";

const socket = io("http://localhost:5000");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const handleJoin = () => {
    if (username !== "" && room !== "") {
      socket.emit("joinRoom", room);
      setShowChat(true)
    }
  };
  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join Chat</h3>
          <input
            type="text"
            placeholder="Name..."
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="Room ID..."
            onChange={(e) => setRoom(e.target.value)}
          />
          <button onClick={handleJoin}>Join Room</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;
