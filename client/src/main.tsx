import { useEffect, useState } from "react";
import { AuthHandle } from "./auth/auth";
import Auth from "./components/Auth";
import ChatView from "./components/ChatView";
import { useRoomContext, useUserContext } from "./utils/context";

type MainProps = {
  socket: any;
};

function Main({ socket }: MainProps) {
  const [loading, setLoading] = useState(true);

  const { userState, login } = useUserContext();

  const { roomState, populate } = useRoomContext();

  useEffect(() => {
    const isLoggedIn = AuthHandle.validate();
    if (isLoggedIn) {
      login();
    }
  }, []);

  return (
    <>
      {userState.isLoggedIn ? (
        <ChatView socket={socket} messageData={roomState.messages} />
      ) : (
        <Auth socket={socket} />
      )}
    </>
  );
}

export default Main;
