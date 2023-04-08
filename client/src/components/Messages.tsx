import React, { useEffect, useRef } from "react";
import { SocketProp } from "../utils/hooks";
import { LSItemHandler } from "../storage";

interface MessageProps {
  socket: SocketProp;
  messages: string[];
}

const Messages: React.FC<MessageProps> = ({ messages }) => {
  const scrollRef = useRef<any>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView();
    }
    const LSmsgs = new LSItemHandler("messages");
    LSmsgs.set(messages);
    const msgs = LSmsgs.get();
    console.log(msgs);
  }, []);

  const scrollSwitch = (msg: any, idx: number, ref: any) => {
    const last = messages.length;
    return idx === last ? (
      <div ref={ref} key={idx}>
        <p>{msg.text}</p>
      </div>
    ) : (
      <div key={idx}>
        <p>{msg.text}</p>
      </div>
    );
  };

  //

  return (
    <div className="scroll-wrapper">
      <div className="messages-container">
        {messages.map((message: string, idx: number) =>
          scrollSwitch(message, idx, scrollRef)
        )}
      </div>
    </div>
  );
};

export default Messages;
