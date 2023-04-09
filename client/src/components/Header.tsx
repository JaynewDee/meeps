import {
  BsGear as Gear,
  BsQuestionCircle as Question,
  BsDoorOpen as ExitDoor
} from "react-icons/bs";
import { AuthHandle } from "../auth/auth";
import { useUserContext } from "../utils/context";

const Header = () => {
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
