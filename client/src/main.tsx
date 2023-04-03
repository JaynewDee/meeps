import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { RoomContextProvider } from "./utils/context";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RoomContextProvider>
      <App />
    </RoomContextProvider>
  </React.StrictMode>
);
