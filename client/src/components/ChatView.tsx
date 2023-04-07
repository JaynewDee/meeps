import React, { useState } from "react";
import Messages from "./Messages";
import ChatForm from "./Forms/ChatForm";
import SessionUtils from "./SessionUtils";
import { useRoomContext } from "../utils/context";

const ChatView: React.FC<any> = ({ socket }) => {
  const { roomState, updateMessages } = useRoomContext();
  const [localMessageState, setLocalMessageState] = useState(
    roomState.messages
  );

  socket.on("chat message", (msg: string) => {
    setLocalMessageState((prev: string[]) => [...prev, msg]);
  });

  return (
    <>
      <Messages socket={socket} messages={roomState.messages} />
      <ChatForm socket={socket} />
      <SessionUtils />
    </>
  );
};
export default ChatView;
