import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from "react";
import { AuthHandle } from "../auth/auth";

interface RoomContextType {}
interface ContextProps {
  children: ReactNode;
}

const RoomContext = createContext<RoomContextType | any>({});

const useRoomContext = () => {
  const context = useContext(RoomContext);

  if (context === undefined) {
    throw new Error(
      "Attempted to use RoomContext outside of the context's Provider."
    );
  }

  return context;
};

const RoomContextProvider = ({ children }: ContextProps) => {
  const [roomState, setRoomState] = useState<{
    name: string;
    messages: string[];
  }>({
    name: "",
    messages: []
  });

  useEffect(() => {
    if (roomState.messages.length === 0) {
      populate();
    }
  }, []);

  const populate = async () => {
    const isLoggedIn = AuthHandle.validate();
    if (!isLoggedIn) return;
  };

  const CtxValue = {
    roomState,
    setRoomState,
    populate
  };

  return (
    <RoomContext.Provider value={CtxValue}>{children}</RoomContext.Provider>
  );
};

export { useRoomContext, RoomContextProvider };

//////////////
// END ROOM CONTEXT
//////////////
// BEGIN USER CONTEXT
//////////////

interface UserContextType {}

const UserContext = createContext<UserContextType | any>({});

const useUserContext = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error(
      "Attempted to use RoomContext outside of the context's Provider."
    );
  }

  return context;
};

interface ContextProps {
  children: ReactNode;
}

const UserContextProvider = ({ children }: ContextProps) => {
  const [userState, setUserState] = useState({
    isLoggedIn: false
  });

  const login = () => setUserState({ isLoggedIn: true });
  const logout = () => setUserState({ isLoggedIn: false });
  const CtxValue = { userState, login, logout };

  return (
    <UserContext.Provider value={CtxValue}>{children}</UserContext.Provider>
  );
};

export { useUserContext, UserContextProvider };
