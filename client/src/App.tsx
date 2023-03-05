import { useState } from "react";

import "./App.css";
import ChatForm from "./components/Forms/ChatForm";
import Register from "./components/Forms/Register";
import Header from "./components/Header";
import Messages from "./components/Messages";
import { useUserContext } from "./utils/context";
import { useChatSocket } from "./utils/hooks";

function App() {
  const [dataStream, setDataStream] = useState([
    `User <Guest> signed in @ ${new Date().toLocaleString()}`
  ]);

  const socket = useChatSocket();

  const { user } = useUserContext();

  const AuthView = () => (
    <>
      <Messages
        socket={socket}
        dataStream={dataStream}
        setDataStream={setDataStream}
      />
      <ChatForm socket={socket} setDataStream={setDataStream} />
    </>
  );

  const authSwitch = () => (!user.token ? <Register /> : <AuthView />);

  return (
    <div className="App">
      <Header />
      {authSwitch()}
    </div>
  );
}

export default App;
