import { useEffect, useState } from "react";

import "./App.css";
import Header from "./components/Header";
import { UserContextProvider } from "./utils/context";
import Main from "./main";
import { LSItemHandler } from "./storage";

function App() {
  const [userSettings, setUserSettings] = useState({
    displayName: "",
    hideRealName: true
  });

  const localStore = new LSItemHandler("settings");

  useEffect(() => {
    const store = localStore.get();
    if (store.length === 0) return;

    setUserSettings(store);
  }, []);

  useEffect(() => {
    localStore.set(userSettings);
  }, [userSettings]);

  return (
    <UserContextProvider>
      <div className="App">
        <Header />
        <Main />
      </div>
    </UserContextProvider>
  );
}

export default App;
