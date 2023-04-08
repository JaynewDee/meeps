import { Dispatch, SetStateAction } from "react";
import { handleError } from "./errors";
import { SocketProp } from "./hooks";

type DataDispatch = Dispatch<SetStateAction<string[]>>;

export const handleSendMessage = async (
  e: React.MouseEvent<HTMLButtonElement>,
  input: string,
  setInput: Dispatch<SetStateAction<string>>,
  errorSetter: any
) => {
  e.preventDefault();
  if (input.length < 1 || input.length > 66) {
    return await handleError("length", errorSetter);
  } else {
    setInput("");
  }
};
