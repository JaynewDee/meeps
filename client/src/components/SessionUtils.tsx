import React from "react";
import { AuthHandle } from "../auth/auth";

const SessionUtils: React.FC<any> = ({}) => {
  const destroySession = () => {
    AuthHandle.logout();
  };

  return (
    <div className="session-utils-box">
      <button onClick={destroySession}>END SESSION</button>
    </div>
  );
};

export default SessionUtils;
