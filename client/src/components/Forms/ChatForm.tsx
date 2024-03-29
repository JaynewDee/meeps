import React, { useState } from "react";
import { BsFillArrowUpCircleFill as Arrow } from "react-icons/bs";
import { useMessageValidation } from "../../hooks";
import { SocketProp } from "../../hooks";
import { API } from "../../api/api";
import { SessionAuthHandle } from "../../auth/auth";

interface ChatFormProps {
  socket: SocketProp;
  currentRoom: string;
}

const ChatForm: React.FC<ChatFormProps> = ({ socket, currentRoom }) => {
  const [inputState, setInputState] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputState(e.target.value);

  const sendMessage = async (e: any) => {
    e.preventDefault();

    try {
      const isValid = await useMessageValidation(
        e,
        inputState,
        setInputState,
        setError
      );
      if (!isValid) return;
    } catch (err) {
      console.error(err);
      return;
    }

    const user = SessionAuthHandle.getUser();
    const authorId = user.data._id;

    const res = await API.persistMsg(
      { text: inputState.trim(), author: authorId },
      currentRoom
    );

    socket!.emit("chat message", res.message);
  };

  return (
    <form className="chat-form">
      <input
        type="text"
        name="message"
        value={inputState}
        autoFocus={true}
        autoComplete="off"
        placeholder="..."
        className="chat-msg-field"
        onChange={handleInputChange}
      />
      <button className="msg-submit-btn" type="submit" onClick={sendMessage}>
        {Arrow({ size: "1.66rem", color: "var(--)" })}
      </button>
      {error && <div className="error-box">{error}</div>}
    </form>
  );
};

export default ChatForm;
