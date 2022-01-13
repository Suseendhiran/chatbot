import React, { useEffect, useRef } from "react";

function Index({ messages, userId, messageRef }) {
  return (
    <div className="chatScreenWrapper">
      {messages.map((message) => {
        return (
          <div className="eachmessage" ref={messageRef}>
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
    </div>
  );
}

export default Index;
