import {
  BsGear as Gear,
  BsQuestionCircle as Question,
  BsDoorOpen as ExitDoor
} from "react-icons/bs";
import { AuthHandle } from "../auth/auth";
import { useUserContext } from "../utils/context";
import { Dispatch, SetStateAction, MouseEvent } from "react";

type Settings = {
  displayName: string;
  hideRealName: boolean;
  currentRoom: string;
};

interface SettingsProp {
  userSettings: Settings;
  setUserSettings: Dispatch<SetStateAction<Settings>>;
  modalState: string;
  setModalState: Dispatch<SetStateAction<string>>;
}

const Header: React.FC<SettingsProp> = ({
  userSettings,
  setUserSettings,
  modalState,
  setModalState
}) => {
  const { logout } = useUserContext();

  const destroySession = () => {
    AuthHandle.logout();
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
