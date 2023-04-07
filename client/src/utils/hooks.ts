import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { API } from "../api/api";
import { useRoomContext } from "./context";

export type SocketProp = null | Socket<any, any>;

export const useChatSocket = (updater: any) => {
  const [socket, setSocket] = useState<SocketProp>(null);
  useEffect(() => {
    // Init client-specific socket connection
    const socket = io("http://localhost:3001");
    /////////////////
    setSocket(socket);
    ///////////////////////////////
    socket.on("connect", () =>
      console.log(`Socket w/ id ${socket.id} connected`)
    );
    ///////////////////////////////
    socket.on("chat message", (msg) => {
      console.log(msg);
      updater(msg);
    });
    ///////////////////////////////
    return () => {
      socket.disconnect();
    };
    ///////////////////////////////
  }, []);

  return socket;
};
