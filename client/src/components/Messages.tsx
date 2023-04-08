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
    console.log(scrollRef.current);
    setTimeout(() => {
      scrollRef.current.scrollTo({ top: 2000, left: 0, behavior: "smooth" });
    }, 1000);

    const LSmsgs = new LSItemHandler("messages");
    LSmsgs.set(messages);
  }, [messages]);

  const scrollSwitch = (msg: any, idx: number, ref: any) => {
    const last = messages.length - 1;
    return idx === last ? (
      <div ref={ref} key={msg._id}>
        <p>{msg.text}</p>
      </div>
    ) : (
      <div key={msg._id}>
        <p>{msg.text}</p>
      </div>
    );
  };

  //

  return (
    <div className="scroll-wrapper">
      <div ref={scrollRef} className="messages-container">
        {messages.map((message: string, idx: number) =>
          scrollSwitch(message, idx, scrollRef)
        )}
      </div>
    </div>
  );
};

export default Messages;
