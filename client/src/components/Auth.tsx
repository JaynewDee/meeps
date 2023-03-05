import { Dispatch, SetStateAction, useState } from "react";
import Login from "./Forms/Login";
import Register from "./Forms/Register";
export type SetAuthDisplay = Dispatch<SetStateAction<string>>;

const Auth = () => {
  const [displayState, setDisplayState] = useState("register");

  return displayState === "register" ? (
    <Register setDisplay={setDisplayState} />
  ) : (
    <Login setDisplay={setDisplayState} />
  );
};

export default Auth;
