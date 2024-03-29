import "./App.css";
import { useState } from "react";
import Header from "./components/Header";
import Main from "./main";
import Modal from "./components/Modal";
import { UserContextProvider } from "./context";
import { useThemeSettings, useUserSettings } from "./hooks";

function App() {
  const [userSettings, setUserSettings] = useUserSettings();

  const CurrentTheme = useThemeSettings(userSettings.currentTheme);

  const [modalState, setModalState] = useState("");

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
          styles: CurrentTheme,
          display: modalState,
          setDisplay: setModalState,
          userSettings,
          setUserSettings,
        })}
      </div>
    </UserContextProvider>
  );
}

export default App;
