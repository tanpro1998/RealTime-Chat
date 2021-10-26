import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

const Chat = ({ socket, username, room }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("sendMessage", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);
  return (
    <div className="chat-window">
      <div className="chat-header">
        <div className="chat-online"></div>
        <h4>Live Chat</h4>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messages) => {
            return (
              <div
                className="message"
                id={username === messages.author ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{messages.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messages.time}</p>
                    <p id="author">{messages.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Hey..."
          onChange={(e) => setCurrentMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
};

export default Chat;
