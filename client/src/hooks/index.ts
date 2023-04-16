import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { Dispatch, SetStateAction } from "react";

const currentProto = window.location.protocol;
const protoByEnv = currentProto === "http:" ? `http://localhost:3001` : ``;

export type SocketProp = null | Socket<any, any>;

export const useChatSocket = (currentRoom: string) => {
  const [socket, setSocket] = useState<SocketProp>(null);

  //

  useEffect(() => {
    // Init client-specific socket connection
    const socket = io(protoByEnv);
    ///////////////////////////////
    setSocket(socket);
    ///////////////////////////////
    socket.on("connect", () => {
      console.log(`Socket w/ id ${socket.id} connected`);
      socket.emit("join room", currentRoom);
    });
    ///////////////////////////////
    socket.on("joined room", (data) => {
      console.log(data);
    });
    ///////////////////////////////
    return () => {
      socket.disconnect();
    };
    ///////////////////////////////
  }, []);

  return socket;
};

type DataDispatch<T> = Dispatch<SetStateAction<T>>;
type ErrorDispatch<T> = DataDispatch<T>;

export const useMessageValidation = async (
  e: React.MouseEvent<HTMLButtonElement>,
  input: string,
  setInput: DataDispatch<string>,
  errorSetter: ErrorDispatch<string>
) => {
  e.preventDefault();
  if (input.length < 1 || input.length > 66) {
    return handleError("length", errorSetter);
  } else {
    setInput("");
    return true;
  }
};

export const useMessageQueue = () => {};

export const useThemeSettings = (currentTheme: string) => {
  const themes: { [key: string]: any } = {
    "Mono Ocean": {
      foreground: "#181818",
      background: "#1f1f1f",
      light: "rgba(255,255,255,0.87)",
      prime: "rgba(0, 255, 255, 0.666)",
      harsh: "rgba(164, 22, 35, 1)",
      variant: "rgba(240, 246, 0)",
      msgField: "black",
      utilsBar: "rgba(15, 15, 15, .9)",
      fontPrimary: `"Anonymous Pro", monospace`
    },

    "Falling Star": {
      foreground: "#0A100D",
      background: "#0A100D",
      light: "rgba(255,255,255,0.87)",
      prime: "#A22C29",
      harsh: "rgba(164, 22, 35, 1)",
      variant: "rgba(240, 246, 0)",
      msgField: "black",
      utilsBar: "",
      fontPrimary: `"Anonymous Pro", monospace`
    },
    "Summer Jungle": {
      foreground: "#181818",
      background: "#1f1f1f",
      light: "rgba(255,255,255,0.87)",
      prime: "rgba(255, 0, 255, 0.666)",
      harsh: "rgba(164, 22, 35, 1)",
      variant: "rgba(240, 246, 0)",
      msgField: "black",
      utilsBar: "rgba(15, 15, 15, .9)",
      fontPrimary: `"Anonymous Pro", monospace`
    }
  };

  const {
    foreground,
    background,
    light,
    prime,
    harsh,
    variant,
    msgField,
    utilsBar,
    fontPrimary
  } = themes[currentTheme];

  return {
    "--foreground": foreground,
    "--background": background,
    "--light": light,
    "--prime": prime,
    "--harsh": harsh,
    "--variant": variant,
    "--msg-field": msgField,
    "--utils-bar": utilsBar,
    "--font-primary": fontPrimary
  } as React.CSSProperties;
};

export const handleError = (type: string, setter: ErrorDispatch<string>) => {
  const errTypes: { [key: string]: string } = {
    length:
      "Your meep must be greater than 0 and fewer than 66 characters long.",
    duplicateUser: "A user is already registered under this email address!",
    wrongPassword: "The password you entered appears to be incorrect...",
    badPassword:
      "Your password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one digit, and one special character from the set @$!%*?",
    badEmail: "The format of the input email fails validation!",
    userNotFound:
      "That user doesn't appear to exist ...  Try again or register.  Hint: All credentials are case-sensitive."
  };

  setter(errTypes[type]);

  setTimeout(() => setter(""), 5000);
  return false;
};

interface ValidationInput {
  firstName?: string;
  lastName?: string;
  username?: string;
  email: string;
  password: string;
}

const matchers = {
  email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  password:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
};

export const useAuthValidation = (
  type: string,
  input: ValidationInput,
  setter: ErrorDispatch<string>
) => {
  const checks: { [key: string]: () => string } = {
    auth: () => {
      const { email, password } = matchers;

      if (!email.test(input.email || "")) {
        return "email";
      }

      if (!password.test(input.password)) {
        return "password";
      }

      return "pass";
    }
  };

  const failBy = checks[type]();

  if (failBy === "email") return handleError("badEmail", setter);

  if (failBy === "password") return handleError("badPassword", setter);

  return "pass";
};
