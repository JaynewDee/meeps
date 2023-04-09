import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const currentProto = window.location.protocol;
const protoByEnv = currentProto === "http:" ? `http://localhost:3001` : ``;

export type SocketProp = null | Socket<any, any>;

export const useChatSocket = () => {
  const [socket, setSocket] = useState<SocketProp>(null);
  useEffect(() => {
    // Init client-specific socket connection
    const socket = io(protoByEnv);
    ///////////////////////////////
    setSocket(socket);
    ///////////////////////////////
    socket.on("connect", () =>
      console.log(`Socket w/ id ${socket.id} connected`)
    );
    ///////////////////////////////
    // socket.on("chat message", (msg) => {
    //   console.log(msg);
    // });
    ///////////////////////////////
    return () => {
      socket.disconnect();
    };
    ///////////////////////////////
  }, []);

  return socket;
};
