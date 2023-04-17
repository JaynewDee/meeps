import { useEffect, useState } from "react";
import { LSItemHandler } from "../storage";
import { useChatSocket, type SocketProp } from "./socket";
import { useThemeSettings } from "./styles";
import {
  useAuthValidation,
  useMessageValidation,
  handleError
} from "./validation";

export type Settings = {
  displayName: string;
  hideRealName: boolean;
  currentRoom: string;
  currentTheme: string;
};

const useUserSettings = () => {
  const currentStore = new LSItemHandler("settings");
  const hasCurrentStore = currentStore.exists();

  const loadState = hasCurrentStore
    ? currentStore.get()
    : {
        displayName: "",
        hideRealName: true,
        currentRoom: "central",
        currentTheme: "Mono Ocean"
      };

  const [userSettings, setUserSettings] = useState<any>(loadState);

  useEffect(() => {
    const storage = new LSItemHandler("settings");
    storage.set(userSettings);
  }, [userSettings]);

  return [userSettings, setUserSettings];
};

export {
  useChatSocket,
  useUserSettings,
  useThemeSettings,
  useAuthValidation,
  useMessageValidation,
  handleError
};

export { SocketProp };
