import "./App.css";
import { useState } from "react";
import Header from "./components/Header";
import Main from "./main";
import Modal from "./components/Modal";
import { UserContextProvider } from "./context";
import { useThemeSettings, useUserSettings } from "./hooks";
import { useUserRooms } from "./hooks/socket";

function App() {
  const [userSettings, setUserSettings] = useUserSettings();

  const CurrentTheme = useThemeSettings(userSettings.currentTheme);

  const [userRooms] = useUserRooms();

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
        {Modal({
          styles: CurrentTheme,
          display: modalState,
          setDisplay: setModalState,
          userSettings,
          userRooms,
          setUserSettings,
        })}
        <Main currentRoom={userSettings.currentRoom} />
      </div>
    </UserContextProvider>
  );
}

export default App;
