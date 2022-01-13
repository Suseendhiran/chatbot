import React, { useRef } from "react";

function Index({ handleSendMessage }) {
  const inputRef = useRef(null);
  return (
    <div className="messageinputWrapper">
      <input
        type={"text"}
        ref={inputRef}
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            handleSendMessage(inputRef?.current?.value);
            inputRef.current.value = "";
          }
        }}
        //value={inputRef?.current?.value}
        className="messageinput"
      ></input>
      <button
        onClick={() => handleSendMessage(inputRef?.current?.value)}
        className="sendButton"
      >
        Send
      </button>
    </div>
  );
}

export default Index;
