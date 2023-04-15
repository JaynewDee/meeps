import { Dispatch, SetStateAction, useState } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  display: string;
  displaySetter: Dispatch<SetStateAction<string>>;
  userSettings: any;
  setUserSettings: Dispatch<SetStateAction<any>>;
}

const Modal: React.FC<ModalProps> = ({
  display,
  displaySetter,
  userSettings,
  setUserSettings
}) => {
  const [selectRoomState, setSelectRoomState] = useState(
    userSettings.currentRoom
  );

  const handleRoomSelect = (e: any) => {
    setSelectRoomState(e.target.value);
  };

  const handleSwitchRooms = (e: any) => {
    setUserSettings((prev: any) => ({ ...prev, currentRoom: selectRoomState }));
  };

  const handleClose = () => {
    displaySetter("");
  };

  const SettingsContent = () => (
    <div className="settings-container">
      <div className="change-room-container">
        <label style={{ textAlign: "center" }}>Traverse Rooms</label>
        <select onChange={handleRoomSelect} value={selectRoomState}>
          <option value="central">Central</option>
          <option value="super cool room">Super Cool Room</option>
        </select>
        <button onClick={handleSwitchRooms}>SWITCH</button>
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
