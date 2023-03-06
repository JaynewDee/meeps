import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState
} from "react";

interface UserContextType {
  login: any;
  logout: any;
}

const UserContext = createContext<UserContextType | any>({});

const useUserContext = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error(
      "Attempted to use UserContext outside of the context's Provider."
    );
  }

  return context;
};

interface ContextProps {
  children: ReactNode;
}

const UserContextProvider = ({ children }: ContextProps) => {
  const [user, setUser] = useState<any>();

  return <UserContext.Provider value={{}}>{children}</UserContext.Provider>;
};

export { useUserContext, UserContextProvider };
