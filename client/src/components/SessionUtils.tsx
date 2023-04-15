import React from "react";
import { API } from "../api/api";
import { AuthHandle } from "../auth/auth";
import { useUserContext } from "../utils/context";

const SessionUtils: React.FC<any> = ({}) => {
  const { logout } = useUserContext();

  const destroySession = () => {
    AuthHandle.logout();
    logout();
  };

  const spacer = () => (
    <div style={{ width: 0, border: "1px solid black", height: "12px" }}></div>
  );

  const fetchRooms = async () => {
    const res = await API.getRooms();
    console.log(res);
  };
  return (
    <div className="session-utils-box">
      {spacer()}
      <button onClick={destroySession}>END SESSION</button>
      {spacer()}
      <button onClick={fetchRooms}>FETCH ROOMS</button>
      {spacer()}
    </div>
  );
};

export default SessionUtils;
