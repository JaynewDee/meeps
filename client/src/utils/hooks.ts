import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

export type SocketProp = null | Socket<any, any>;

export const useChatSocket = () => {
  const [socket, setSocket] = useState<SocketProp>(null);

  useEffect(() => {
    // Init client-specific socket connection
    const socket = io();
    /////////////////////

    /////////////////
    setSocket(socket);
    /////////////////

    ///////////////////////////////
    socket.on("connect", () => {
      console.log("Socket.IO connected");
    });
    ///////////////////////////////

    ///////////////////////////////
    return () => {
      socket.disconnect();
    };
    ///////////////////////////////
  }, []);

  return socket;
};
