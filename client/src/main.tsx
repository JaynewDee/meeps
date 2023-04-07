import { useEffect } from "react";
import { AuthHandle } from "./auth/auth";
import Auth from "./components/Auth";
import ChatView from "./components/ChatView";
import {
  RoomContextProvider,
  useRoomContext,
  useUserContext
} from "./utils/context";
import { useChatSocket } from "./utils/hooks";

type MainProps = {
  socket: any;
};

function Main() {
  const { userState, login } = useUserContext();
  const { updateMessages } = useRoomContext();

  const socket = useChatSocket(updateMessages);

  useEffect(() => {
    const isLoggedIn = AuthHandle.validate();
    if (isLoggedIn) {
      login();
    }
  }, []);

  return (
    <>
      {userState.isLoggedIn ? (
        <ChatView socket={socket} />
      ) : (
        <Auth socket={socket} />
      )}
    </>
  );
}

export default Main;
