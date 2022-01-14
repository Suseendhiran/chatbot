import logo from "./logo.svg";
import "./App.css";
import { io } from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import ChatScreen from "./Components/ChatScreen";
import SendMessage from "./Components/SendMessage";

const socket = io("http://localhost:4000/");

function App() {
  const [userId, setUserId] = useState("");
  const sessionStorageMessages = JSON.parse(sessionStorage.getItem(userId));
  const [messages, setMessages] = useState(
    sessionStorageMessages ? sessionStorageMessages : []
  );

  function createSocketConnection() {
    console.log("Initial Connection", new Date());

    socket.on("connect", () => {
      const id = socket.id;
      setUserId(id);
      sessionStorage.setItem("userId", id);
    });
    socket.on("toClients", (userMessage, botMessage) => {
      console.log("inside emit", userMessage, botMessage, messages);
      setAllMessages(userMessage, botMessage, messages);
    });
  }

  function setAllMessages(userMessage, botMessage) {
    const previousMessages = JSON.parse(sessionStorage.getItem("messages"));
    const allMessages = previousMessages
      ? [...previousMessages, userMessage, botMessage]
      : [userMessage, botMessage];
    console.log(
      "inside all set"

      //previousMessages
      // userMessage,
      // botMessage,
      // userMessage.senderId === userId
    );
    if (userMessage.senderId === userId) {
      setMessages([...previousMessages, botMessage]);
      sessionStorage.setItem("messages", JSON.stringify(allMessages));
      return;
    }
    setMessages([...allMessages]);
    sessionStorage.setItem("messages", JSON.stringify(allMessages));
  }

  const handleSendMessage = (message) => {
    console.log("message", message);
    if (!message) return;
    socket.emit("sendMessage", message);
    setMessages([...messages, { message: message, senderId: userId }]);
  };

  const disconnectSocket = () => {
    console.log("disconnected");
    socket.disconnect();
  };

  useEffect(() => {
    if (!userId) {
      createSocketConnection();
    }
    return () => {
      disconnectSocket();
      setMessages([]);
      sessionStorage.clear();
    };
  }, []);
  useEffect(() => {
    //console.log(messages);
    sessionStorage.clear();
    setMessages([]);
  }, [userId]);

  // useEffect(() => {},[messages])
  return (
    <div className="App">
      <h3 className="userid">Your chat id: {userId}</h3>
      <div className="wrapper">
        <ChatScreen messages={messages} userId={userId} />
        <SendMessage
          handleSendMessage={(message) => handleSendMessage(message)}
        />
      </div>
    </div>
  );
}

export default App;
