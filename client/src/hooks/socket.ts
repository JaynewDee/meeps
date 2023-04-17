import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { API } from "../api/api";
import { SessionAuthHandle } from "../auth/auth";

const currentProto = window.location.protocol;
const protoByEnv = currentProto === "http:" ? `http://localhost:3001` : ``;

export type SocketProp = null | Socket<any, any>;

export const useChatSocket = (currentRoom: string): SocketProp => {
  const [socket, setSocket] = useState<SocketProp>(null);

  //

  useEffect(() => {
    // Init client-specific socket connection
    const socket = io(protoByEnv);
    ///////////////////////////////
    setSocket(socket);
    ///////////////////////////////
    socket.on("connect", () => {
      console.log(`Socket w/ id ${socket.id} connected`);
      socket.emit("join room", currentRoom);
    });
    ///////////////////////////////
    socket.on("joined room", data => {
      console.log(data);
    });
    ///////////////////////////////
    return () => {
      socket.disconnect();
    };
    ///////////////////////////////
  }, []);

  return socket;
};

export const useUserRooms = () => {
  const [userRooms, setUserRooms] = useState([]);

  useEffect(() => {
    const fetchUserRooms = async () => {
      const { data } = SessionAuthHandle.getUser();
      const res = await API.getUserRooms(data._id);
      setUserRooms(res.data);
    };
    if (SessionAuthHandle.validate()) {
      fetchUserRooms();
    }
  }, []);

  return [userRooms];
};
