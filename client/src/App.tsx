import { useCallback, useEffect, useState } from "react";

import "./App.css";
import Header from "./components/Header";
import { useChatSocket } from "./utils/hooks";
import {
  RoomContextProvider,
  UserContextProvider,
  useRoomContext
} from "./utils/context";
import Main from "./Main";
import { API } from "./api/api";

function App() {
  const [errorState, toggleErrorState] = useState("");
  const { roomState, setRoomState } = useRoomContext();

  const populate = useCallback(async () => {
    const messages = await API.getRecentMessages("central");
    setRoomState({ name: "central", messages: messages.data.reverse() });
  }, [setRoomState]);

  return (
    <UserContextProvider>
      <div className="App">
        {errorState && <p>{errorState}</p>}
        <Header />
        <Main populate={populate} />
      </div>
    </UserContextProvider>
  );
}

export default App;
