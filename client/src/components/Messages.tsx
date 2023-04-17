import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { SocketProp } from "../hooks";
import { LSItemHandler } from "../storage";

type Author = {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
};

type MessageType = {
  _id: string;
  text: string;
  author: Author;
  createdAt: string;
  recipient: string;
};

export type MessageArray = MessageType[];

interface MessageProps {
  socket: SocketProp;
  messages: MessageArray;
  setMessageState: Dispatch<SetStateAction<MessageArray>>;
}

const Messages: React.FC<MessageProps> = ({
  socket,
  messages,
  setMessageState,
}) => {
  socket!.on("chat message", (msg: MessageType) => {
    setMessageState([...messages, msg]);
  });

  //

  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      setTimeout(() => {
        scrollRef.current!.scrollTo({
          top: scrollRef.current!.scrollHeight,
          left: 0,
          behavior: "smooth",
        });
      }, 200);
    }

    const LSmsgs = new LSItemHandler("messages");
    LSmsgs.set(messages);
  }, [messages, socket]);

  //

  return (
    <div ref={scrollRef} className="scroll-wrapper">
      <div className="messages-container">
        {messages.map((message: MessageType) => Message(message))}
      </div>
    </div>
  );
};

const Message: React.FC<MessageType> = ({ _id, author, createdAt, text }) => {
  const symbolTime = (time: Date) => (
    <div className="datetime">
      <span style={{ color: "var(--prime)", paddingRight: ".33rem" }}>
        {"<"}
      </span>
      <span>{time.toLocaleDateString()}</span>
      <span className="time-at">{"@"}</span>
      <span>
        {time.toLocaleTimeString(navigator.language, {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </span>
      <span style={{ color: "var(--prime)", paddingLeft: ".33rem" }}>
        {">"}
      </span>
    </div>
  );

  return (
    <div className="message-content" key={_id}>
      <div className="name-and-date">
        <span className="message-username">{author.username}</span>
        {symbolTime(new Date(createdAt))}
      </div>
      <p className="message-text">{text}</p>
    </div>
  );
};

export default Messages;
