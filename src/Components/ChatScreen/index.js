import React, { useEffect, useRef } from "react";

function Index({ messages, userId }) {
  const messageRef = useRef(null);

  useEffect(() => {
    // const element = document.getElementById("scrollMessages");
    // console.log(element);
    // element.scrollIntoView();
    messageRef.current.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);
  return (
    <div className="chatScreenWrapper">
      {messages.map((message, index) => {
        return (
          <div className="eachmessage" key={index}>
            <div
              className="messageWrapper"
              style={{
                marginLeft: `${userId === message.senderId ? "auto" : ""}`,
              }}
            >
              <p>
                Sender :{" "}
                {userId === message.senderId ? "You" : message.senderId}
              </p>
              <p className="message">{message.message}</p>
            </div>
          </div>
        );
      })}
      <div id="scrollMessages" ref={messageRef} />
    </div>
  );
}

export default Index;
