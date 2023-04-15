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

export const useThemeSettings = (currentTheme: string) => {
  const themes: { [key: string]: any } = {
    "Mono Ocean": {
      foreground: "#181818",
      background: "#1f1f1f",
      light: "rgba(255,255,255,0.87)",
      prime: "rgba(0, 255, 255, 0.666)",
      harsh: "rgba(164, 22, 35, 1)",
      variant: "rgba(240, 246, 0)",
      msgField: "black",
      utilsBar: "rgba(15, 15, 15, .9)",
      fontPrimary: `"Anonymous Pro", monospace`
    },
    "Falling Star": {
      foreground: "#181818",
      background: "#1f1f1f",
      light: "rgba(255,255,255,0.87)",
      prime: "rgba(255, 0, 255, 0.666)",
      harsh: "rgba(164, 22, 35, 1)",
      variant: "rgba(240, 246, 0)",
      msgField: "black",
      utilsBar: "rgba(15, 15, 15, .9)",
      fontPrimary: `"Anonymous Pro", monospace`
    },
    "Summer Jungle": {}
  };

  const {
    foreground,
    background,
    light,
    prime,
    harsh,
    variant,
    msgField,
    utilsBar,
    fontPrimary
  } = themes[currentTheme];

  return {
    "--foreground": foreground,
    "--background": background,
    "--light": light,
    "--prime": prime,
    "--harsh": harsh,
    "--variant": variant,
    "--msg-field": msgField,
    "--utils-bar": utilsBar,
    "--font-primary": fontPrimary
  } as React.CSSProperties;
};
