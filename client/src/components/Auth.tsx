import { Dispatch, SetStateAction, useState } from "react";
import { SocketProp } from "../utils/hooks";
import Login from "./Forms/Login";
import Register from "./Forms/Register";

export type SetAuthDisplay = Dispatch<SetStateAction<string>>;

interface AuthProps {
  socket: SocketProp;
  setDataStream: Dispatch<SetStateAction<any[]>>;
}

const Auth: React.FC<AuthProps> = ({ socket, setDataStream }) => {
  const [displayState, setDisplayState] = useState("login");

  const formProps = {
    setDisplay: setDisplayState,
    socket: socket,
    setDataStream: setDataStream
  };

  return displayState === "register" ? (
    <Register {...formProps} />
  ) : (
    <Login {...formProps} />
  );
};

export default Auth;
