import React from "react";
import { SessionAuthHandle } from "../auth/auth";
import { useUserContext } from "../context";

const SessionUtils: React.FC<any> = ({ currentRoom }) => {
  const { logout } = useUserContext();

  const destroySession = () => {
    SessionAuthHandle.logout();
    logout();
  };

  const spacer = () => <div className="util-spacer"></div>;

  return (
    <div className="utils-container">
      <div className="session-utils-box">
        {spacer()}
        <button onClick={destroySession}>END SESSION</button>
        {spacer()}
      </div>
      <div className="status-bar">
        <div>
          <button className="location-btn">
            <span className="location-decor">{"["}</span>
            {currentRoom}
            <span className="location-decor">{"]"}:::</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionUtils;
