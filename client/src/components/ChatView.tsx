import React from "react";
import Messages from "./Messages";
import ChatForm from "./Forms/ChatForm";
import SessionUtils from "./SessionUtils";
import { useRoomContext } from "../utils/context";

const ChatView: React.FC<any> = ({ socket, messageData }) => {
  return (
    <>
      <Messages socket={socket} messages={messageData} />
      <ChatForm socket={socket} />
      <SessionUtils />
    </>
  );
};
export default ChatView;
