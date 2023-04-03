import React from "react";
import { API } from "../api/api";
import { AuthHandle } from "../auth/auth";

const SessionUtils: React.FC<any> = ({}) => {
  const destroySession = () => {
    AuthHandle.logout();
  };

  const getAllRooms = async () => {
    const res = await API.getRooms();
    console.log(res);
  };

  const getOwnUser = async () => {
    const res = await API.getMe();
    console.log(res);
  };

  const getRecentMsgs = async () => {
    const res = await API.getRecentMessages("central");
    console.log(res);
  };

  const spacer = () => (
    <div style={{ width: 0, border: "1px solid black", height: "12px" }}></div>
  );

  return (
    <div className="session-utils-box">
      <button onClick={destroySession}>END SESSION</button>
      {spacer()}
      <button onClick={getAllRooms}>FETCH ROOMS</button>
      {spacer()}
      <button onClick={getOwnUser}>FETCH ME</button>
      {spacer()}
      <button onClick={getRecentMsgs}>FETCH MSGS</button>
    </div>
  );
};

export default SessionUtils;
