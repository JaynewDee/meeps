import { Dispatch, SetStateAction } from "react";
import { handleError } from "./errors";
import { SocketProp } from "./hooks";

export const handleSendMessage = async (
  e: React.MouseEvent<HTMLButtonElement>,
  socket: SocketProp,
  input: string,
  setInput: Dispatch<SetStateAction<string>>,
  setData: Dispatch<SetStateAction<string[]>>,
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
