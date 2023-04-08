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
    console.log(msg);
    setMessageState((prev: string[]) => [...prev, msg]);
  });

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView();
    }

    const LSmsgs = new LSItemHandler("messages");
    LSmsgs.set(messages);
  }, [messages]);

  const scrollSwitch = (msg: any, idx: number, ref: any) => {
    const last = messages.length;
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
      <div className="messages-container">
        {messages.map((message: string, idx: number) =>
          scrollSwitch(message, idx, scrollRef)
        )}
      </div>
    </div>
  );
};

export default Messages;
