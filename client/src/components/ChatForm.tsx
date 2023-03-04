import React, { Dispatch, SetStateAction, useState } from "react";
import { SocketProp } from "../App";
import { BsFillArrowUpCircleFill as Arrow } from "react-icons/bs";

interface ChatFormProps {
  socket: SocketProp;
  dataStream: string[];
  setDataStream: Dispatch<SetStateAction<string[]>>;
}

const ChatForm: React.FC<ChatFormProps> = ({ socket, setDataStream }) => {
  const [inputState, setInputState] = useState("");
  const [error, setError] = useState("");

  const handleError = async (type: string) => {
    const errTypes: { [key: string]: string } = {
      length:
        "Your meep must be greater than 0 and fewer than 66 characters long."
    };
    setError(errTypes[type]);
    return setTimeout(() => setError(""), 3000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputState(e.target.value);
  };

  const handleSendMessage = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (inputState.length < 1 || inputState.length > 66) {
      await handleError("length");
      return;
    } else {
      setDataStream((prev) => [...prev, inputState]);
      socket!.emit("chat message", inputState);
      setInputState("");
    }
  };

  return (
    <form className="chat-form">
      <input
        type="text"
        name="message"
        value={inputState}
        placeholder="Meep at 'em"
        className="chat-msg-field"
        onChange={handleInputChange}
      />
      <button
        type="submit"
        className="msg-submit-btn"
        onClick={handleSendMessage}
      >
        {Arrow({ size: "3rem" })}
      </button>
      {error && <div className="message-error">{error}</div>}
    </form>
  );
};

export default ChatForm;
