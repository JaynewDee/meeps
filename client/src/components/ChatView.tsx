import React, { useEffect, useState } from "react";
import Messages from "./Messages";
import ChatForm from "./Forms/ChatForm";
import SessionUtils from "./SessionUtils";
import { API } from "../api/api";

const ChatView: React.FC<any> = ({ socket }) => {
  const [loading, setLoading] = useState(true);
  const [localMessageState, setLocalMessageState] = useState<string[]>([]);

  useEffect(() => {
    const getMessages = async () => {
      const messages = await API.getRecentMessages("central");
      setLocalMessageState(messages.data.reverse());
      setLoading(false);
    };

    if (localMessageState.length === 0) {
      getMessages();
    }
  }, []);

  return (
    <>
      {loading ? (
        <div className="messages-loading">Fetching messages ... </div>
      ) : (
        <>
          <Messages
            socket={socket}
            messages={localMessageState}
            setMessageState={setLocalMessageState}
          />
          <ChatForm socket={socket} />
          <SessionUtils />
        </>
      )}
    </>
  );
};

export default ChatView;
