import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { RoomContextProvider, UserContextProvider } from "./utils/context";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <UserContextProvider>
      <RoomContextProvider>
        <App />
      </RoomContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);
