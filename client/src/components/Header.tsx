import {
  BsGear as Gear,
  BsQuestionCircle as Question,
  BsDoorOpen as ExitDoor
} from "react-icons/bs";
import { SessionAuthHandle } from "../auth/auth";
import { useUserContext } from "../context";
import { Dispatch, SetStateAction, MouseEvent } from "react";
import { Settings } from "../App";

//

interface SettingsProp {
  userSettings: Settings;
  setUserSettings: Dispatch<SetStateAction<Settings>>;
  modalState: string;
  setModalState: Dispatch<SetStateAction<string>>;
}

const Header: React.FC<SettingsProp> = ({ modalState, setModalState }) => {
  const { logout } = useUserContext();

  const destroySession = () => {
    SessionAuthHandle.logout();
    logout();
  };

  const handleModalDisplay = (e: MouseEvent<HTMLSpanElement>) => {
    const type = e.currentTarget.getAttribute("data-modal") as string;
    setModalState(type === modalState ? "" : type);
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
      <></>
    </header>
  );
};

export default Header;
