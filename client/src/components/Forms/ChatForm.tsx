import React, { Dispatch, SetStateAction, useState } from "react";
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputState(e.target.value);

  const sendMessage = (e: any) =>
    handleSendMessage(
      e,
      socket,
      inputState,
      setInputState,
      setDataStream,
      setError
    );

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
      <button type="submit" className="msg-submit-btn" onClick={sendMessage}>
        {Arrow({ size: "3rem" })}
      </button>
      {error && <div className="message-error">{error}</div>}
    </form>
  );
};

export default ChatForm;
