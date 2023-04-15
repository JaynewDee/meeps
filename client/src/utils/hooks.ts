import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { Dispatch, SetStateAction } from "react";
import { handleError } from "./errors";

const currentProto = window.location.protocol;
const protoByEnv = currentProto === "http:" ? `http://localhost:3001` : ``;

export type SocketProp = null | Socket<any, any>;

export const useChatSocket = (currentRoom: string) => {
  const [socket, setSocket] = useState<SocketProp>(null);
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
    return () => {
      socket.disconnect();
    };
    ///////////////////////////////
  }, []);

  return socket;
};

type DataDispatch<T> = Dispatch<SetStateAction<T>>;
type ErrorDispatch<T> = DataDispatch<T>;

export const useMessageValidation = async (
  e: React.MouseEvent<HTMLButtonElement>,
  input: string,
  setInput: DataDispatch<string>,
  errorSetter: ErrorDispatch<string>
) => {
  e.preventDefault();
  if (input.length < 1 || input.length > 66) {
    return handleError("length", errorSetter);
  } else {
    setInput("");
    return true;
  }
};
