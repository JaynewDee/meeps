import React, { Suspense } from "react";
import Messages from "./Messages";
import ChatForm from "./Forms/ChatForm";
import SessionUtils from "./SessionUtils";
import { useMessageQueue } from "../hooks/socket";

const ChatView: React.FC<any> = ({ socket, currentRoom }) => {
  const [localMessageState, setLocalMessageState] =
    useMessageQueue(currentRoom);

  return (
    <>
      <Suspense fallback={<>Loading ...</>}>
        <Messages
          socket={socket}
          messages={localMessageState}
          setMessageState={setLocalMessageState}
        />
        <ChatForm socket={socket} currentRoom={currentRoom} />
        <SessionUtils currentRoom={currentRoom} />
      </Suspense>
    </>
  );
};

export default ChatView;
