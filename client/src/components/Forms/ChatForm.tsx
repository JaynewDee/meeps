import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { BsFillArrowUpCircleFill as Arrow } from "react-icons/bs";
import { handleSendMessage } from "../../utils/events";
import { SocketProp } from "../../utils/hooks";

interface ChatFormProps {
  socket: SocketProp;
  setDataStream: Dispatch<SetStateAction<string[]>>;
}

const ChatForm: React.FC<ChatFormProps> = ({ socket, setDataStream }) => {
  const [inputState, setInputState] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputState(e.target.value);
  };

  const sendMessage = async (e: any) => {
    e.preventDefault();
    await handleSendMessage(
      e,
      socket,
      inputState,
      setInputState,
      setDataStream,
      setError
    ).catch((err) => console.error(err));
  };

  return (
    <form className="chat-form">
      <input
        type="text"
        name="message"
        value={inputState}
        autoFocus={true}
        autoComplete="off"
        placeholder="Meep at 'em"
        className="chat-msg-field"
        onChange={handleInputChange}
      />
      <button className="msg-submit-btn" type="submit" onClick={sendMessage}>
        {Arrow({ size: "2rem" })}
      </button>
      {error && <div className="message-error">{error}</div>}
    </form>
  );
};

export default ChatForm;
