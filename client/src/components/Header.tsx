import {
  BsGear as Gear,
  BsQuestionCircle as Question,
  BsDoorOpen as ExitDoor
} from "react-icons/bs";
import { AuthHandle } from "../auth/auth";
import { useUserContext } from "../utils/context";
import { Dispatch, SetStateAction, MouseEvent, useState } from "react";
import { createPortal } from "react-dom";

type Settings = {
  displayName: string;
  hideRealName: boolean;
};

interface SettingsProp {
  userSettings: Settings;
  setUserSettings: Dispatch<SetStateAction<Settings>>;
}

const Header: React.FC<SettingsProp> = ({ userSettings, setUserSettings }) => {
  const [modalState, setModalState] = useState("");
  const { logout } = useUserContext();

  const destroySession = () => {
    AuthHandle.logout();
    logout();
  };

  const handleModalDisplay = (e: MouseEvent<HTMLSpanElement>) => {
    const target = e.currentTarget;
    const type = target.getAttribute("data-modal") as string;
    setModalState(type);
  };

  return (
    <header>
      <h1 className="app-title">ROOMY</h1>
      <div className="menu-options">
        <span
          className="settings-icon menu-icon"
          data-modal="settings"
          onClick={handleModalDisplay}
        >
          {Gear({})}
        </span>
        <span
          className="help-icon menu-icon"
          data-modal="help"
          onClick={handleModalDisplay}
        >
          {Question({})}
        </span>
        <span className="exit-icon menu-icon" onClick={destroySession}>
          {ExitDoor({})}
        </span>
      </div>
      <>{modalState && Modal({ display: modalState, setter: setModalState })}</>
    </header>
  );
};

export default Header;

interface ModalProps {
  display: string;
  setter: Dispatch<SetStateAction<string>>;
}

const Modal: React.FC<ModalProps> = ({ display, setter }) => {
  const SettingsContent = () => {
    return <div>SETTINGS MODAL</div>;
  };

  const HelpContent = () => {
    return <div>HELP MODAL</div>;
  };

  const handleClose = () => setter("");

  const contentSwitch = () =>
    display === "settings" ? (
      SettingsContent()
    ) : display === "help" ? (
      HelpContent()
    ) : (
      <></>
    );

  return createPortal(
    <div className="modal-container">
      <button onClick={handleClose}>X</button>
      <div>{contentSwitch()}</div>
    </div>,
    document.getElementById("modal-root") as HTMLElement
  );
};
