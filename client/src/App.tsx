import "./App.css";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import Header from "./components/Header";
import Main from "./main";
import { UserContextProvider } from "./utils/context";
import { LSItemHandler } from "./storage";
import { createPortal } from "react-dom";

interface ModalProps {
  display: string;
  displaySetter: Dispatch<SetStateAction<string>>;
  setUserSettings: Dispatch<SetStateAction<any>>;
}

const Modal: React.FC<ModalProps> = ({
  display,
  displaySetter,
  setUserSettings
}) => {
  const [selectRoomState, setSelectRoomState] = useState("");

  const handleClose = () => {
    displaySetter("");
  };

  const handleRoomSelect = (e: any) =>
    setSelectRoomState(e.currentTarget.value);

  const handleSwitchRooms = (e: any) => {
    setUserSettings((prev: any) => ({ ...prev, currentRoom: selectRoomState }));
  };

  const SettingsContent = () => (
    <div>
      <select onChange={handleRoomSelect} value={selectRoomState}>
        <option value="central">Central</option>
      </select>
      <button onClick={handleSwitchRooms}>SWITCH</button>
    </div>
  );

  const HelpContent = () => {};

  return createPortal(
    !display ? (
      <></>
    ) : (
      <div className="modal-container">
        <button
          onClick={handleClose}
          style={{ position: "absolute", top: "0", right: "0" }}
        >
          X
        </button>
        <div>{display === "settings" ? SettingsContent() : <></>}</div>
      </div>
    ),

    document.getElementById("modal-root") as HTMLElement
  );
};

function App() {
  const [userSettings, setUserSettings] = useState({
    displayName: "",
    hideRealName: true,
    currentRoom: "central"
  });

  const [modalState, setModalState] = useState("");

  // const localStore = new LSItemHandler("settings");

  useEffect(() => {
    console.log(userSettings);
    // const store = localStore.get();
    // if (store == userSettings || store.length === 0) return;
    // setUserSettings(store);
  }, []);

  return (
    <UserContextProvider>
      <div className="App">
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
