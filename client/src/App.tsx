import { useCallback, useEffect, useMemo, useState } from "react";
import { AuthHandle } from "./auth/auth";

import "./App.css";
import Auth from "./components/Auth";
import ChatForm from "./components/Forms/ChatForm";
import Header from "./components/Header";
import Messages from "./components/Messages";
import { useUserContext } from "./utils/context";
import { useChatSocket } from "./utils/hooks";
import SessionUtils from "./components/SessionUtils";

interface UserAuth {
  firstName: string;
  lastName: string;
  email: string;
  memberships: any[];
}

const userDefault: UserAuth = {
  firstName: "",
  lastName: "",
  email: "",
  memberships: []
};

function App() {
  const [dataStream, setDataStream] = useState<[] | string[]>([]);
  const socket = useChatSocket();

  const AuthenticatedView = () => (
    <>
      <Messages
        socket={socket}
        dataStream={dataStream}
        setDataStream={setDataStream}
      />
      <ChatForm socket={socket} setDataStream={setDataStream} />
    </>
  );

  const authSwitch = () =>
    !AuthHandle.getUser() ? (
      <Auth socket={socket} setDataStream={setDataStream} />
    ) : (
      <>
        <SessionUtils />
        <AuthenticatedView />
      </>
    );

  return (
    <div className="App">
      <Header />
      {authSwitch()}
    </div>
  );
}

export default App;
