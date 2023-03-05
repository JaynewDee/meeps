import { useCallback, useEffect, useState } from "react";
import { AuthHandle } from "./api/auth";

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

  useEffect(() => {
    if (AuthHandle.validate()) {
      const token = AuthHandle.getUser();
      console.log(token);
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
