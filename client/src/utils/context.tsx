import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState
} from "react";

const UserContext = createContext({});

const useUserContext = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error(
      "Attempted to use UserContext outside of the context's Provider."
    );
  }

  return context;
};

const userDefault = {
  username: "",
  email: "",
  token: ""
};

const UserContextProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(userDefault);

  const login = useCallback((authenticatedUser: any) => {
    setUser(authenticatedUser);
  }, []);

  const logout = useCallback(() => {
    setUser(userDefault);
  }, []);

  const contextValue = useMemo(
    () => ({
      user,
      login,
      logout
    }),
    [user, login, logout]
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export { useUserContext, UserContextProvider };
