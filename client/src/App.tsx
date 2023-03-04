import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

import "./App.css";
import ChatForm from "./components/ChatForm";
import Header from "./components/Header";
import Messages from "./components/Messages";

export type SocketProp = null | Socket<any, any>;

function App() {
  const [socket, setSocket] = useState<SocketProp>(null);
  const [dataStream, setDataStream] = useState([
    `User <Guest> signed in @ ${new Date().toLocaleString()}`
  ]);

  useEffect(() => {
    //

    const socket = io("//localhost:3001"); // connect to the current host and port

    //

    setSocket(socket);

    //

    socket.on("connect", () => {
      console.log("Socket.IO connected");
    });

    //

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="App">
      <Header />
      <Messages
        socket={socket}
        dataStream={dataStream}
        setDataStream={setDataStream}
      />
      <ChatForm
        socket={socket}
        dataStream={dataStream}
        setDataStream={setDataStream}
      />
    </div>
  );
}

export default App;
