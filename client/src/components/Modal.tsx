import { Dispatch, SetStateAction, useState } from "react";
import { createPortal } from "react-dom";
import "./Modal.css";

interface ModalProps {
  display: string;
  setDisplay: Dispatch<SetStateAction<string>>;
  userSettings: any;
  setUserSettings: Dispatch<SetStateAction<any>>;
  styles: any;
}

const Modal: React.FC<ModalProps> = ({
  display,
  setDisplay,
  userSettings,
  setUserSettings,
  styles,
}) => {
  const [selectRoomState, setSelectRoomState] = useState(
    userSettings.currentRoom
  );

  const handleRoomSelect = (e: any) => {
    setSelectRoomState(e.target.value);
  };

  const handleThemeSelect = (e: any) => {
    setUserSettings((prev: any) => ({
      ...prev,
      currentTheme: e.target.value,
    }));
  };

  const handleSwitchRooms = (e: any) => {
    setUserSettings((prev: any) => ({ ...prev, currentRoom: selectRoomState }));
  };

  const handleClose = () => {
    setDisplay("");
  };

  const SettingsContent = () => (
    <div className="settings-container" style={styles}>
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
          {["Mono Ocean", "Comet", "Summer Jungle"].map(opt => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
    </div>
  );

  const HelpContent = () => {
    return <div>HELP</div>;
  };

  return createPortal(
    !display ? (
      <></>
    ) : (
      <div className="modal-container">
        <button className="close-modal-btn" onClick={handleClose}>
          X
        </button>
        <div>{display === "settings" ? SettingsContent() : HelpContent()}</div>
      </div>
    ),
    document.getElementById("modal-root") as HTMLElement
  );
};

export default Modal;
