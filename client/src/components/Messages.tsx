import React, { useEffect, useRef } from "react";
import { SocketProp } from "../hooks";
import { LSItemHandler } from "../storage";

type Author = {
  _id: string;
  firstName: string;
  lastName: string;
  username: string | null;
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
  setMessageState: (msgData: MessageArray) => any;
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
      }, 100);
    }

    const LSmsgs = new LSItemHandler("messages");
    LSmsgs.set(messages);
  }, [messages, socket]);

  //

  return (
    <div ref={scrollRef} className="scroll-wrapper">
      <div className="messages-container">
        {messages.map((message: MessageType) => {
          return Message(message);
        })}
      </div>
    </div>
  );
};

const formattedTime = (time: Date) => (
  <div className="datetime">
    <span style={{ color: "var(--prime)", paddingRight: ".33rem" }}>{"<"}</span>
    {/* <span>{time.toLocaleDateString()}</span>
    <span className="time-at">{"@"}</span> */}
    <span>
      {time.toLocaleTimeString(navigator.language, {
        hour: "2-digit",
        minute: "2-digit",
      })}
    </span>
    <span style={{ color: "var(--prime)", paddingLeft: ".33rem" }}>{">"}</span>
  </div>
);

const Message = ({ _id, author, createdAt, text }: MessageType) => {
  return (
    <div
      className="message-content"
      key={_id}
      style={
        !author.username
          ? {
              borderTop: "none",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexFlow: "row-reverse nowrap",
            }
          : {}
      }
    >
      <div
        className="name-and-date"
        style={!author.username ? { marginRight: "0" } : {}}
      >
        {author.username && (
          <span className="message-username">{author.username}</span>
        )}
        {formattedTime(new Date(createdAt))}
      </div>
      <p className="message-text">{text}</p>
    </div>
  );
};

export default Messages;
