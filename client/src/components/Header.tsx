import { BsGear as Gear, BsQuestionCircle as Question } from "react-icons/bs";

const Header = () => {
  return (
    <header>
      <h1 className="app-title">ROOMY</h1>
      <div className="menu-options">
        {/* On click, display settings modal */}
        <span className="settings-icon">{Gear({})}</span>
        <span className="help-icon">{Question({})}</span>
      </div>
    </header>
  );
};

export default Header;
