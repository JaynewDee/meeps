import React from "react";
import { useUserContext } from "../utils/context";
import { AuthHandle } from "../auth/auth";
const Header = () => {
  const { user, logout } = useUserContext();

  const destroySession = () => {
    logout();
    AuthHandle.logout();
  };

  return (
    <header>
      <h1 className="app-title">MEEP</h1>
      {user.email && <button onClick={destroySession}>END SESSION</button>}
    </header>
  );
};

export default Header;
