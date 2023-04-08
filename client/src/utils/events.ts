import { Dispatch, SetStateAction } from "react";
import { handleError } from "./errors";
import { SocketProp } from "./hooks";

type DataDispatch<T> = Dispatch<SetStateAction<T>>;
type ErrorDispatch<T> = DataDispatch<T>;

export const handleSendMessage = async (
  e: React.MouseEvent<HTMLButtonElement>,
  input: string,
  setInput: DataDispatch<string>,
  errorSetter: ErrorDispatch<string>
) => {
  e.preventDefault();
  if (input.length < 1 || input.length > 66) {
    return await handleError("length", errorSetter);
  } else {
    setInput("");
  }
};
