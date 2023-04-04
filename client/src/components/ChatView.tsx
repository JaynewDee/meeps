import React from "react";
import Messages from "./Messages";
import ChatForm from "./Forms/ChatForm";
import SessionUtils from "./SessionUtils";

const ChatView: React.FC<any> = ({ socket }) => (
  <>
    <Messages socket={socket} />
    <ChatForm socket={socket} />
    <SessionUtils />
  </>
);
export default ChatView;
