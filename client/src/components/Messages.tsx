import React, { useEffect, useRef } from "react";
import { SocketProp } from "../utils/hooks";
import { useRoomContext } from "../utils/context";

interface MessageProps {
  socket: SocketProp;
  messages: string[];
}

const Messages: React.FC<MessageProps> = ({ socket, messages }) => {
  const { roomState, populate } = useRoomContext();

  const scrollRef = useRef<any>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView();
    }
    if (!messages.length) {
      populate();
    }
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
