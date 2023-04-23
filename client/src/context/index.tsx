import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

interface ContextProps {
  children: ReactNode;
}

interface UserContextType {}

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
  const [userState, setUserState] = useState({
    isLoggedIn: false,
  });

  const login = useCallback(
    () => setUserState({ isLoggedIn: true }),
    [setUserState]
  );
  const logout = useCallback(
    () => setUserState({ isLoggedIn: false }),
    [setUserState]
  );

  const CtxValue = useMemo(
    () => ({ userState, login, logout }),
    [userState, login, logout]
  );

  return (
    <UserContext.Provider value={CtxValue}>{children}</UserContext.Provider>
  );
};

export { useUserContext, UserContextProvider };
