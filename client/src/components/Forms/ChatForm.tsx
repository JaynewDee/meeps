import React, { Dispatch, SetStateAction, useState } from "react";
import { BsFillArrowUpCircleFill as Arrow } from "react-icons/bs";
import { handleSendMessage } from "../../utils/events";
import { SocketProp } from "../../utils/hooks";
import { API } from "../../api/api";
import { AuthHandle } from "../../auth/auth";
import { useRoomContext } from "../../utils/context";

interface ChatFormProps {
  socket: SocketProp;
}

const ChatForm: React.FC<ChatFormProps> = ({ socket }) => {
  const [inputState, setInputState] = useState("");
  const [error, setError] = useState("");

  const { updateMessages } = useRoomContext();

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
      setError
    ).catch((err) => console.error(err));

    const user = AuthHandle.getUser();
    const authorId = user.data._id;

    await API.persistMsg(
      { text: inputState, author: authorId },
      "642211298736c6c14a07df3e"
    );
    updateMessages(inputState);
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
