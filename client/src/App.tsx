import "./App.css";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Main from "./main";
import Modal from "./components/Modal";
import { UserContextProvider } from "./context";
import { useThemeSettings, useUserSettings } from "./hooks";
import { LSItemHandler } from "./storage";

function App() {
  const [userSettings, setUserSettings] = useUserSettings();

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
