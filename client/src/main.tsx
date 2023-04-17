import { useEffect } from "react";
import { SessionAuthHandle } from "./auth/auth";
import Auth from "./components/Auth";
import ChatView from "./components/ChatView";
import { useUserContext } from "./context";
import { useChatSocket } from "./hooks";

function Main({ currentRoom }: { currentRoom: string }) {
  const { userState, login, logout } = useUserContext();

  const socket = useChatSocket(currentRoom);

  useEffect(() => {
    // Synchronize state with session token
    const isLoggedIn = SessionAuthHandle.validate();

    //
    if (isLoggedIn) {
      login();
      return;
    }
    //

    logout();
  }, []);

  useEffect(() => {
    if (!userState.isLoggedIn) {
      socket?.disconnect();
    }
  }, [userState]);

  useEffect(() => {
    socket?.emit("join room", currentRoom);
  }, [currentRoom]);

  return (
    <>
      {userState.isLoggedIn ? (
        <ChatView socket={socket} currentRoom={currentRoom} />
      ) : (
        <Auth socket={socket} />
      )}
    </>
  );
}

export default Main;
