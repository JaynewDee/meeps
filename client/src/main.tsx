import { useEffect } from "react";
import { AuthHandle } from "./auth/auth";
import Auth from "./components/Auth";
import ChatView from "./components/ChatView";
import { useUserContext } from "./utils/context";

type MainProps = {
  socket: any;
  loginState: boolean;
};

function Main({ socket, loginState }: MainProps) {
  const { login } = useUserContext();

  useEffect(() => {
    if (AuthHandle.validate()) {
      login();
    }
  }, [loginState]);
  return (
    <>{loginState ? <ChatView socket={socket} /> : <Auth socket={socket} />}</>
  );
}

export default Main;
