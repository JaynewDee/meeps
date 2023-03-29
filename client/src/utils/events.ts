import { Dispatch, SetStateAction } from "react";
import { API } from "../api/api";
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
  setData: DataDispatch,
  userId: string
) => {
  const notification = `User <${username}> signed in @ ${new Date().toLocaleString()}`;

  setData((prev: any) => [...prev, notification]);

  await API.persistMsg(
    { text: notification, author: userId },
    "642211298736c6c14a07df3e"
  );

  socket!.emit("chat message", notification);
};
