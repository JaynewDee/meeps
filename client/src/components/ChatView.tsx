import React, { useEffect, useState } from "react";
import Messages from "./Messages";
import ChatForm from "./Forms/ChatForm";
import SessionUtils from "./SessionUtils";
import { useRoomContext } from "../utils/context";

const ChatView: React.FC<any> = ({ socket }) => {
  const [localMessageState, setLocalMessageState] = useState<string[]>([]);
  const { roomState } = useRoomContext();

  useEffect(() => {
    setLocalMessageState(roomState.messages);
  }, []);

  socket!.on("chat message", (msg: string) => {
    setLocalMessageState((prev: string[]) => [...prev, msg]);
  });

  return (
    <>
      <Messages socket={socket} messages={localMessageState} />
      <ChatForm socket={socket} />
      <SessionUtils />
    </>
  );
};
export default ChatView;
