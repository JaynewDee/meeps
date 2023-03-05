import { Dispatch, SetStateAction, useState } from "react";
import { SocketProp } from "../utils/hooks";
import Login from "./Forms/Login";
import Register from "./Forms/Register";
export type SetAuthDisplay = Dispatch<SetStateAction<string>>;

interface AuthProps {
  socket: SocketProp;
  setDataStream: Dispatch<SetStateAction<string[]>>;
}

const Auth: React.FC<AuthProps> = ({ socket, setDataStream }) => {
  const [displayState, setDisplayState] = useState("register");

  return displayState === "register" ? (
    <Register
      setDisplay={setDisplayState}
      socket={socket}
      setDataStream={setDataStream}
    />
  ) : (
    <Login setDisplay={setDisplayState} />
  );
};

export default Auth;
