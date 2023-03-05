import { useState } from "react";

import "./App.css";
import ChatForm from "./components/Forms/ChatForm";
import Header from "./components/Header";
import Messages from "./components/Messages";
import { useChatSocket } from "./utils/hooks";

function App() {
  const [dataStream, setDataStream] = useState([
    `User <Guest> signed in @ ${new Date().toLocaleString()}`
  ]);

  const socket = useChatSocket();

  return (
    <div className="App">
      <Header />
      <Messages
        socket={socket}
        dataStream={dataStream}
        setDataStream={setDataStream}
      />
      <ChatForm socket={socket} setDataStream={setDataStream} />
    </div>
  );
}

export default App;
