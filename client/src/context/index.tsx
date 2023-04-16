import { createContext, ReactNode, useContext, useState } from "react";

interface ContextProps {
  children: ReactNode;
}

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
