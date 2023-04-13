import { Dispatch, SetStateAction } from "react";
import { handleError } from "./errors";
import { SocketProp } from "./hooks";

type DataDispatch<T> = Dispatch<SetStateAction<T>>;
type ErrorDispatch<T> = DataDispatch<T>;

export const validateMessage = async (
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
