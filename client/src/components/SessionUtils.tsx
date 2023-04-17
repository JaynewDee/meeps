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

  const fetchRooms = async () => {
    const res = await API.getRooms();
  };

  const fetchUserRooms = async () => {
    const { data } = SessionAuthHandle.getUser();
    const res = await API.getUserRooms(data._id);
  };

  const spacer = () => <div className="util-spacer"></div>;

  return (
    <div className="utils-container">
      <div className="session-utils-box">
        {spacer()}
        <button onClick={destroySession}>END SESSION</button>
        {spacer()}
        {/* <button onClick={fetchRooms}>FETCH ROOMS</button>
        {spacer()}
        <button onClick={fetchUserRooms}>FETCH USER'S ROOMS</button>
        {spacer()} */}
      </div>
      <div className="status-bar">
        <div>
          <button className="location-btn">
            <span className="location-decor">{"["}</span>
            {currentRoom}
            <span className="location-decor">{"]"}:::</span>
          </button>
          {/* <span>{currentRoom}</span> */}
        </div>
      </div>
    </div>
  );
};

export default SessionUtils;
