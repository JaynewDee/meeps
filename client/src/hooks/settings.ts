import { useState, useEffect, Dispatch } from "react";
import { LSItemHandler } from "../storage";

export type Settings = {
  displayName: string;
  hideRealName: boolean;
  currentRoom: string;
  currentTheme: string;
};

export const useUserSettings = (): [Settings, any] => {
  const currentStore = new LSItemHandler("settings");
  const hasCurrentStore = currentStore.exists();

  const loadState = hasCurrentStore
    ? currentStore.get()
    : {
        displayName: "",
        hideRealName: true,
        currentRoom: "central",
        currentTheme: "Mono Ocean",
      };

  const [userSettings, setUserSettings] = useState<Settings>(loadState);

  useEffect(() => {
    const storage = new LSItemHandler("settings");
    storage.set(userSettings);
  }, [userSettings]);

  return [userSettings, setUserSettings];
};
