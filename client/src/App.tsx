import { useEffect, useState } from "react";
import { AuthHandle } from "./auth/auth";

import "./App.css";
import Auth from "./components/Auth";
import ChatForm from "./components/Forms/ChatForm";
import Header from "./components/Header";
import Messages from "./components/Messages";
import { useChatSocket } from "./utils/hooks";
import SessionUtils from "./components/SessionUtils";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [errorState, toggleErrorState] = useState("");

  const socket = useChatSocket();

  useEffect(() => {
    if (AuthHandle.validate() && !loggedIn) {
      setLoggedIn(true);
    }
  }, []);

  const ChatView = () => (
    <>
      <Messages socket={socket} />
      <ChatForm socket={socket} />
      <SessionUtils />
    </>
  );

  const authSwitch = () =>
    !loggedIn ? <Auth socket={socket} /> : <>{<ChatView />}</>;

  return (
    <div className="App">
      {errorState && <p>{errorState}</p>}
      <Header />
      {authSwitch()}
    </div>
  );
}

export default App;
