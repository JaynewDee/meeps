import { Dispatch, SetStateAction } from "react";
import { handleError } from "./errors";
import { SocketProp } from "./hooks";

type DataDispatch = Dispatch<SetStateAction<string[]>>;

export const handleSendMessage = async (
  e: React.MouseEvent<HTMLButtonElement>,
  socket: SocketProp,
  input: string,
  setInput: Dispatch<SetStateAction<string>>,
  setData: DataDispatch,
  errorSetter: any
) => {
  e.preventDefault();
  if (input.length < 1 || input.length > 66) {
    await handleError("length", errorSetter);
    return;
  } else {
    setData((prev: any) => [...prev, input]);
    socket!.emit("chat message", input);
    setInput("");
  }
};

export const broadcastSignin = async (
  socket: SocketProp,
  username: string,
  setData: DataDispatch
) => {
  const notification = `User <${
    username.split("@")[0]
  }> signed in @ ${new Date().toLocaleString()}`;

  setData((prev: any) => [...prev, notification]);
  socket!.emit("chat message", notification);
};
