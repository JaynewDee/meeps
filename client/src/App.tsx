import { useEffect, useState } from "react";
import { AuthHandle } from "./auth/auth";

import "./App.css";
import Auth from "./components/Auth";
import ChatForm from "./components/Forms/ChatForm";
import Header from "./components/Header";
import Messages from "./components/Messages";
import { useUserContext } from "./utils/context";
import { useChatSocket } from "./utils/hooks";

function App() {
  const [dataStream, setDataStream] = useState<[] | string[]>([]);

  const socket = useChatSocket();

  const { login } = useUserContext();

  useEffect(() => {
    if (AuthHandle.validate()) {
      const { data } = AuthHandle.getUser() as any;
      const { firstName, lastName, email, memberships } = data;
      login({ firstName, lastName, email, memberships });
    }
  }, []);

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
      <AuthenticatedView />
    );

  return (
    <div className="App">
      <Header />
      {authSwitch()}
    </div>
  );
}

export default App;
