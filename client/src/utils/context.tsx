import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import { API } from "../api/api";
import { AuthHandle } from "../auth/auth";

interface RoomContextType {}

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

interface ContextProps {
  children: ReactNode;
}

const RoomContextProvider = ({ children }: ContextProps) => {
  const [roomState, setRoomState] = useState({
    name: "",
    messages: []
  });

  useMemo(async () => {
    const isLoggedIn = AuthHandle.validate();

    if (!isLoggedIn) return;
    const messages = await API.getRecentMessages("central");
    setRoomState((prev) => ({ ...prev, messages }));
  }, []);

  const CtxValue = useMemo(
    () => ({
      roomState
    }),
    [roomState]
  );
  return (
    <RoomContext.Provider value={CtxValue}>{children}</RoomContext.Provider>
  );
};

export { useRoomContext, RoomContextProvider };
