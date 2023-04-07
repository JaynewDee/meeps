import { useState } from "react";

import "./App.css";
import Header from "./components/Header";
import { useChatSocket } from "./utils/hooks";
import {
  RoomContextProvider,
  UserContextProvider,
  useRoomContext
} from "./utils/context";
import Main from "./Main";

function App() {
  const [errorState, toggleErrorState] = useState("");

  return (
    <UserContextProvider>
      <RoomContextProvider>
        <div className="App">
          {errorState && <p>{errorState}</p>}
          <Header />
          <Main />
        </div>
      </RoomContextProvider>
    </UserContextProvider>
  );
}

export default App;
