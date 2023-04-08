import { useCallback, useEffect, useState } from "react";

import "./App.css";
import Header from "./components/Header";
import { UserContextProvider, useRoomContext } from "./utils/context";
import Main from "./Main";
import { API } from "./api/api";

function App() {
  const [errorState, toggleErrorState] = useState("");

  return (
    <UserContextProvider>
      <div className="App">
        {errorState && <p>{errorState}</p>}
        <Header />
        <Main />
      </div>
    </UserContextProvider>
  );
}

export default App;
