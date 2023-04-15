import {
  BsGear as Gear,
  BsQuestionCircle as Question,
  BsDoorOpen as ExitDoor
} from "react-icons/bs";
import { AuthHandle } from "../auth/auth";
import { useUserContext } from "../utils/context";
import { Dispatch, SetStateAction } from "react";

type Settings = {
  displayName: string;
  hideRealName: boolean;
};

interface SettingsProp {
  userSettings: Settings;
  setUserSettings: Dispatch<SetStateAction<Settings>>;
}

const Header: React.FC<SettingsProp> = ({ userSettings, setUserSettings }) => {
  const { logout } = useUserContext();

  const destroySession = () => {
    AuthHandle.logout();
    logout();
  };

  return (
    <header>
      <h1 className="app-title">ROOMY</h1>
      <div className="menu-options">
        {/* On click, display settings modal */}
        <span className="settings-icon menu-icon">{Gear({})}</span>
        <span className="help-icon menu-icon">{Question({})}</span>
        <span className="exit-icon menu-icon" onClick={destroySession}>
          {ExitDoor({})}
        </span>
      </div>
    </header>
  );
};

export default Header;
