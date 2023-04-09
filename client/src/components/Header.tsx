import { BsFillGearFill as Gear } from "react-icons/bs";

const Header = () => {
  return (
    <header>
      <h1 className="app-title">ROOMY</h1>
      <div className="menu-options">
        {/* On click, display settings modal */}
        <span className="settings-icon">{Gear({})}</span>
        <span className="help-icon">{Gear({})}</span>
      </div>
    </header>
  );
};

export default Header;
