import { useEffect } from "react";
import { AuthHandle } from "./auth/auth";
import Auth from "./components/Auth";
import ChatView from "./components/ChatView";
import { useUserContext } from "./utils/context";
import { useChatSocket } from "./utils/hooks";

function Main({ currentRoom }: { currentRoom: string }) {
  const { userState, login, logout } = useUserContext();

  const socket = useChatSocket(currentRoom);

  useEffect(() => {
    // Synchronize state with session token
    const isLoggedIn = AuthHandle.validate();
    if (isLoggedIn) {
      login();
      return;
    }
    logout();
  }, []);

  useEffect(() => {
    socket?.emit("join room", currentRoom);
  }, [currentRoom]);

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
