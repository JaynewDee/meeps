import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { SocketProp } from "../hooks";
import Login from "./Forms/Login";
import Register from "./Forms/Register";

export type SetAuthDisplay = Dispatch<SetStateAction<string>>;

interface AuthProps {
  socket: SocketProp;
}

const Auth: React.FC<AuthProps> = ({ socket }) => {
  const [displayState, setDisplayState] = useState("login");

  const formProps = useMemo(
    () => ({
      setDisplay: setDisplayState,
      socket: socket
    }),
    [socket, setDisplayState]
  );

  return displayState === "register" ? (
    <Register {...formProps} />
  ) : (
    <Login {...formProps} />
  );
};

export default Auth;
