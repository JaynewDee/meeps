import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { SocketProp } from "../utils/hooks";

interface MessageProps {
  socket: SocketProp;
  dataStream: string[];
  setDataStream: Dispatch<SetStateAction<string[]>>;
}

const Messages: React.FC<MessageProps> = ({
  socket,
  dataStream,
  setDataStream
}) => {
  socket?.on("chat message", (msg: string) => {
    console.log(msg);
    setDataStream((prev) => [...dataStream, msg]);
  });

  const scrollRef = useRef<any>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView();
    }
  }, [dataStream]);

  const scrollSwitch = (msg: string, idx: number, ref: any) => {
    const last = dataStream.length - 1;
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
        {dataStream.map((message: string, idx: number) => {
          return scrollSwitch(message, idx, scrollRef);
        })}
      </div>
    </div>
  );
};

export default Messages;
