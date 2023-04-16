import { Dispatch, SetStateAction, useState } from "react";
import { createPortal, flushSync } from "react-dom";

interface ModalProps {
  display: string;
  setDisplay: Dispatch<SetStateAction<string>>;
  userSettings: any;
  setUserSettings: Dispatch<SetStateAction<any>>;
}

const Modal: React.FC<ModalProps> = ({
  display,
  setDisplay,
  userSettings,
  setUserSettings
}) => {
  const [selectRoomState, setSelectRoomState] = useState(
    userSettings.currentRoom
  );

  const [selectThemeState, setSelectThemeState] = useState(
    userSettings.currentTheme
  );

  const handleRoomSelect = (e: any) => {
    setSelectRoomState(e.target.value);
  };

  const handleThemeSelect = (e: any) => {
    setUserSettings((prev: any) => ({
      ...prev,
      currentTheme: e.target.value
    }));
  };

  const handleSwitchRooms = (e: any) => {
    setUserSettings((prev: any) => ({ ...prev, currentRoom: selectRoomState }));
  };

  const handleSwitchTheme = () => {};

  const handleClose = () => {
    setDisplay("");
  };

  console.log(selectThemeState);

  const SettingsContent = () => (
    <div className="settings-container">
      <div className="change-room-container">
        <label style={{ textAlign: "center" }}>Traverse Rooms</label>
        <select onChange={handleRoomSelect} value={selectRoomState}>
          <option value="central">Central</option>
          <option value="Super Cool Room">Super Cool Room</option>
          <option value="private">Private</option>
        </select>
        <button onClick={handleSwitchRooms}>SWITCH ROOMS</button>
      </div>
      <div className="change-theme-container">
        <label style={{ textAlign: "center" }}>THEME</label>
        <select onChange={handleThemeSelect} value={userSettings.currentTheme}>
          {["Mono Ocean", "Falling Star", "Summer Jungle"].map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <button onClick={handleSwitchTheme}>CHANGE</button>
      </div>
    </div>
  );

  const HelpContent = () => {};

  return createPortal(
    !display ? (
      <></>
    ) : (
      <div className="modal-container">
        <button className="close-modal-btn" onClick={handleClose}>
          X
        </button>
        <div>{display === "settings" ? SettingsContent() : <></>}</div>
      </div>
    ),
    document.getElementById("modal-root") as HTMLElement
  );
};

export default Modal;
