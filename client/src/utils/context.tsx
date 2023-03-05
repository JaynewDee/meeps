import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState
} from "react";

interface UserAuth {
  firstName: string;
  lastName: string;
  email: string;
  memberships: any[];
}

interface UserContextType {
  user: UserAuth;
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

const userDefault: UserAuth = {
  firstName: "",
  lastName: "",
  email: "",
  memberships: []
};

interface ContextProps {
  children: ReactNode;
}

const UserContextProvider = ({ children }: ContextProps) => {
  const [user, setUser] = useState<any>(userDefault);

  const login = useCallback(
    (authenticatedUser: UserAuth) => {
      setUser(authenticatedUser);
    },
    [setUser]
  );

  const logout = useCallback(() => {
    setUser(userDefault);
  }, [setUser]);

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
