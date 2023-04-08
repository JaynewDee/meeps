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
  const scrollRef = useRef<any>(null);

  socket!.on("chat message", (msg: string) => {
    setMessageState([...messages, msg]);
  });

  useEffect(() => {
    if (scrollRef.current) {
      setTimeout(() => {
        scrollRef.current.scrollTo({
          top: scrollRef.current.scrollHeight,
          left: 0,
          behavior: "smooth"
        });
      }, 333);
    }

    const LSmsgs = new LSItemHandler("messages");
    LSmsgs.set(messages);
  }, [messages]);

  //

  return (
    <div className="scroll-wrapper">
      <div ref={scrollRef} className="messages-container">
        {messages.map((message: any, idx: number) => (
          <div key={message._id}>
            <p className="message-username">{message.author.username}</p>
            <p className="message-text">{message.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Messages;
