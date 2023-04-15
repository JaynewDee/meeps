import "./App.css";
import { useState } from "react";
import Header from "./components/Header";
import Main from "./main";
import Modal from "./components/Modal";
import { UserContextProvider } from "./utils/context";
import { useThemeSettings } from "./utils/hooks";

function App() {
  const [userSettings, setUserSettings] = useState({
    displayName: "",
    hideRealName: true,
    currentRoom: "central",
    currentTheme: "Falling Star"
  });

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
          displaySetter: setModalState,
          setUserSettings
        })}
      </div>
    </UserContextProvider>
  );
}

export default App;
