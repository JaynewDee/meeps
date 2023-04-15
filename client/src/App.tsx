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
  const handleClose = () => {
    displaySetter("");
  };
  const selectInputRef = useRef<HTMLSelectElement>(null);

  const SettingsContent = () => {};

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
        <div></div>
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
        <Header
          userSettings={userSettings}
          setUserSettings={setUserSettings}
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
