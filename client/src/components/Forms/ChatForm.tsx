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

  const focusRef = useRef(null as any);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputState(e.target.value);

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

  const reFocus = (e: any) => {
    e.preventDefault();
    focusRef.current.focus();
  };

  return (
    <form className="chat-form" autoComplete="off">
      <input
        type="text"
        name="message"
        value={inputState}
        placeholder="Meep at 'em"
        className="chat-msg-field"
        onChange={handleInputChange}
        ref={focusRef}
      />
      <button
        onPointerDown={(e) => e.preventDefault()}
        className="msg-submit-btn"
        onClick={(e) => {
          sendMessage(e);
        }}
        onKeyDown={reFocus}
      >
        {Arrow({ size: "2rem" })}
      </button>
      {error && <div className="message-error">{error}</div>}
    </form>
  );
};

export default ChatForm;
