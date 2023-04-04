import { useEffect, useState } from "react";

import "./App.css";
import Header from "./components/Header";
import { useChatSocket } from "./utils/hooks";
import { useUserContext } from "./utils/context";
import Main from "./Main";
import { AuthHandle } from "./auth/auth";

function App() {
  const [errorState, toggleErrorState] = useState("");

  const socket = useChatSocket();

  const { userState, login } = useUserContext();

  return (
    <div className="App">
      {errorState && <p>{errorState}</p>}
      <Header />
      <Main socket={socket} loginState={userState.isLoggedIn} />
    </div>
  );
}

export default App;
