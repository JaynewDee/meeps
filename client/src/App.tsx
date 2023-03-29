import { useEffect, useState } from "react";
import { AuthHandle } from "./auth/auth";

import "./App.css";
import Auth from "./components/Auth";
import ChatForm from "./components/Forms/ChatForm";
import Header from "./components/Header";
import Messages from "./components/Messages";
import { useChatSocket, useMessageFetch } from "./utils/hooks";
import SessionUtils from "./components/SessionUtils";
import React from "react";

interface UserAuth {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  memberships: any[];
}

const userDefault: UserAuth | {} = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  memberships: []
};

function App() {
  const [user, setUser] = useState(userDefault);

  const [connectionError, toggleConnectionError] = useState("");

  useEffect(() => {
    ping();
    const user = AuthHandle.getUser() as any;
    user ? setUser(user.data) : 1;
  }, []);

  const [msgs] = useMessageFetch();
  console.log(msgs);
  const ping = (): void =>
    navigator.onLine
      ? toggleConnectionError("")
      : toggleConnectionError(
          "Your browser does not appear to have access to the internet."
        );

  const socket = useChatSocket();

  const [dataStream, setDataStream] = useState<[] | string[]>([]);

  const ChatView = () => (
    <>
      <Messages
        socket={socket}
        dataStream={dataStream}
        setDataStream={setDataStream}
      />
      <ChatForm socket={socket} setDataStream={setDataStream} user={user} />
      <SessionUtils />
    </>
  );

  const authSwitch = () =>
    !AuthHandle.getUser() ? (
      <Auth socket={socket} setDataStream={setDataStream} />
    ) : (
      <>
        <ChatView />
      </>
    );

  return (
    <div className="App">
      {connectionError && <p>{connectionError}</p>}
      <Header />
      {authSwitch()}
    </div>
  );
}

export default React.memo(App);
