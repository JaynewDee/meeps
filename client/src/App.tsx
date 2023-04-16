import "./App.css";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Main from "./main";
import Modal from "./components/Modal";
import { UserContextProvider } from "./context";
import { useThemeSettings } from "./hooks";
import { LSItemHandler } from "./storage";

export type Settings = {
  displayName: string;
  hideRealName: boolean;
  currentRoom: string;
  currentTheme: string;
};

function App() {
  const [userSettings, setUserSettings] = useState<Settings>({
    displayName: "",
    hideRealName: true,
    currentRoom: "central",
    currentTheme: "Comet"
  });

  useEffect(() => {
    const storage = new LSItemHandler("settings");
    storage.update({});
  }, []);

  const [modalState, setModalState] = useState("");

  const CurrentTheme = useThemeSettings(userSettings.currentTheme);

  return (
    <UserContextProvider>
      <div className="App" style={CurrentTheme}>
        <Header
          userSettings={userSettings}
          setUserSettings={setUserSettings}
          modalState={modalState}
          setModalState={setModalState}
        />
        <Main currentRoom={userSettings.currentRoom} />
        {Modal({
          display: modalState,
          setDisplay: setModalState,
          userSettings,
          setUserSettings
        })}
      </div>
    </UserContextProvider>
  );
}

export default App;
