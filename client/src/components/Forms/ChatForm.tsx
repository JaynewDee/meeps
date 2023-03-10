import React, { Dispatch, SetStateAction, useState } from "react";
import { BsFillArrowUpCircleFill as Arrow } from "react-icons/bs";
import { handleSendMessage } from "../../utils/events";
import { SocketProp } from "../../utils/hooks";
import { API } from "../../api/api";

interface ChatFormProps {
  socket: SocketProp;
  setDataStream: Dispatch<SetStateAction<string[]>>;
  user: any;
}

const ChatForm: React.FC<ChatFormProps> = ({ socket, setDataStream, user }) => {
  const [inputState, setInputState] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputState(e.target.value);
  };

  console.log(user);

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
    await API.persistMsg({ text: inputState, author: user.email }, "central");
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
        {Arrow({ size: "1.66rem" })}
      </button>
      {error && <div className="error-box">{error}</div>}
    </form>
  );
};

export default ChatForm;
