import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { API } from "../api/api";
import { useRoomContext } from "./context";

export type SocketProp = null | Socket<any, any>;

export const useChatSocket = () => {
  const [socket, setSocket] = useState<SocketProp>(null);

  useEffect(() => {
    // Init client-specific socket connection
    const socket = io("http://localhost:3001");
    /////////////////////
    socket.connect();
    /////////////////
    setSocket(socket);
    ///////////////////////////////
    socket.on("connect", () =>
      console.log(`Socket w/ id ${socket.id} connected`)
    );
    ///////////////////////////////

    return () => {
      socket.disconnect();
    };
    ///////////////////////////////
  }, []);

  return socket;
};
