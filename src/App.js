import logo from "./logo.svg";
import "./App.css";
import { io } from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import ChatScreen from "./Components/ChatScreen";
import SendMessage from "./Components/SendMessage";

const socket = io("http://localhost:4000/");
var userId = "";
socket.on("connect", () => {
  userId = socket.id;
  document.getElementsByClassName(
    "userid"
  )[0].innerText = `Your chat id: ${userId}`;
  //localStorage.setItem("userId", socket.id);
});

function App() {
  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState("");
  const messageRef = useRef(null);

  function createSocketConnection() {
    socket.on("connect", () => {
      setUserId(socket.id);
      // document.getElementsByClassName(
      //   "userid"
      // )[0].innerText = `Your chat id: ${userId}`;
      //localStorage.setItem("userId", socket.id);
    });
  }
  socket.on("toClients", (message, senderId) => {
    console.log("inside emit", senderId);
    const messageDetails = {
      message: message,
      senderId: senderId,
    };
    setMessages([...messages, messageDetails]);
  });

  const handleSendMessage = (message) => {
    console.log("message", message);
    if (!message) return;
    socket.emit("sendMessage", message);
    setMessages([...messages, { message: message, senderId: userId }]);
    console.log("ref", messageRef.current);
  };

  const disconnectSocket = () => {
    socket.disconnect();
  };

  useEffect(() => {
    if (!userId) {
      createSocketConnection();
    }
    return () => {
      disconnectSocket();
    };
  }, []);

  return (
    <div className="App">
      <h3 className="userid">Your chat id {userId}</h3>
      <div className="wrapper">
        <ChatScreen
          messages={messages}
          userId={userId}
          messageRef={messageRef}
        />
        <SendMessage
          handleSendMessage={(message) => handleSendMessage(message)}
        />
      </div>
    </div>
  );
}

export default App;
