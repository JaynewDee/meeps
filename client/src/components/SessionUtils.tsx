import React from "react";
import { API } from "../api/api";
import { SessionAuthHandle } from "../auth/auth";
import { useUserContext } from "../context";

const SessionUtils: React.FC<any> = ({ currentRoom }) => {
  const { logout } = useUserContext();

  const destroySession = () => {
    SessionAuthHandle.logout();
    logout();
  };

  const spacer = () => (
    <div
      style={{
        width: 0,
        border: "1px solid var(--prime)",
        height: "12px",
      }}
    ></div>
  );

  const fetchRooms = async () => {
    const res = await API.getRooms();
    console.log(res);
  };

  const fetchUserRooms = async () => {
    const { data } = SessionAuthHandle.getUser();
    const res = await API.getUserRooms(data._id);
    console.log(res);
  };

  return (
    <div className="utils-container">
      <div className="session-utils-box">
        {spacer()}
        <button onClick={destroySession}>END SESSION</button>
        {spacer()}
        <button onClick={fetchRooms}>FETCH ROOMS</button>
        {spacer()}
        <button onClick={fetchUserRooms}>FETCH USER'S ROOMS</button>
        {spacer()}
      </div>
      <div className="status-bar">{currentRoom.toUpperCase()}</div>
    </div>
  );
};

export default SessionUtils;
