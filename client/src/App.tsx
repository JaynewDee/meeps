import { useState } from "react";

import "./App.css";
import Header from "./components/Header";
import { useChatSocket } from "./utils/hooks";
import { UserContextProvider, useRoomContext } from "./utils/context";
import Main from "./Main";

function App() {
  const [errorState, toggleErrorState] = useState("");

  const { updateMessages } = useRoomContext();
  const socket = useChatSocket();

  socket?.on("chat message", (msg: any) => {
    updateMessages(msg);
  });
  return (
    <UserContextProvider>
      <div className="App">
        {errorState && <p>{errorState}</p>}
        <Header />
        <Main socket={socket} />
      </div>
    </UserContextProvider>
  );
}

export default App;
