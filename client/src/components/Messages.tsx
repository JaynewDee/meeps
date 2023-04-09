import React, { useEffect, useRef } from "react";
import { SocketProp } from "../utils/hooks";
import { LSItemHandler } from "../storage";

interface MessageProps {
  socket: SocketProp;
  messages: string[];
  setMessageState: any;
}

const Messages: React.FC<MessageProps> = ({
  socket,
  messages,
  setMessageState
}) => {
  socket!.on("chat message", (msg: string) => {
    setMessageState([...messages, msg]);
  });

  //

  const scrollRef = useRef<any>(null);

  useEffect(() => {
    if (scrollRef.current) {
      setTimeout(() => {
        scrollRef.current.scrollTo({
          top: scrollRef.current.scrollHeight,
          left: 0,
          behavior: "smooth"
        });
      }, 200);
    }

    const LSmsgs = new LSItemHandler("messages");
    LSmsgs.set(messages);
  }, [messages]);

  //

  const symbolTime = (time: Date) => (
    <div className="datetime">
      <span style={{ color: "var(--prime-blue)", paddingRight: ".33rem" }}>
        {"<<<"}
      </span>
      <span>{time.toLocaleDateString()}</span>
      <span className="time-at">{"@"}</span>
      <span>
        {time.toLocaleTimeString(navigator.language, {
          hour: "2-digit",
          minute: "2-digit"
        })}
      </span>
      <span style={{ color: "var(--prime-blue)", paddingLeft: ".33rem" }}>
        {">>>"}
      </span>
    </div>
  );

  return (
    <div className="scroll-wrapper">
      <div ref={scrollRef} className="messages-container">
        {messages.map((message: any, idx: number) => (
          <div className="message-content" key={message._id}>
            <div className="name-and-date">
              <span className="message-username">
                {message.author.username}
              </span>
              {symbolTime(new Date(message.createdAt))}
            </div>
            <p className="message-text">{message.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Messages;
