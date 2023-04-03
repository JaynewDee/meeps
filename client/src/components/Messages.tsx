import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { SocketProp } from "../utils/hooks";
import { useRoomContext } from "../utils/context";

interface MessageProps {
  socket: SocketProp;
}

const Messages: React.FC<MessageProps> = ({ socket }) => {
  const { roomState } = useRoomContext();

  socket?.on("chat message", (msg: string) => {});

  const scrollRef = useRef<any>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView();
    }
  }, [roomState]);

  const scrollSwitch = (msg: string, idx: number, ref: any) => {
    const last = roomState.messages.length;
    return idx === last ? (
      <div ref={ref} key={idx}>
        <p>{msg}</p>
      </div>
    ) : (
      <div key={idx}>
        <p>{msg}</p>
      </div>
    );
  };

  //

  return (
    <div className="scroll-wrapper">
      <div className="messages-container">
        {roomState.messages.map((message: string, idx: number) =>
          scrollSwitch(message, idx, scrollRef)
        )}
      </div>
    </div>
  );
};

export default Messages;
