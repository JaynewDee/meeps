import React, { Dispatch, SetStateAction, useState } from "react";
import { SocketProp } from "../App";

interface ChatFormProps {
  socket: SocketProp;
  dataStream: string[];
  setDataStream: Dispatch<SetStateAction<string[]>>;
}

const ChatForm: React.FC<ChatFormProps> = ({
  socket,
  dataStream,
  setDataStream
}) => {
  const [inputState, setInputState] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputState(e.target.value);
  };

  const handleSendMessage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setDataStream((prev) => [...prev, inputState]);
    socket!.emit("chat message", inputState);
    setInputState("");
  };

  return (
    <form className="chat-form">
      <input
        type="text"
        name="message"
        value={inputState}
        onChange={handleInputChange}
      />
      <button onClick={handleSendMessage}>SEND</button>
    </form>
  );
};

export default ChatForm;
