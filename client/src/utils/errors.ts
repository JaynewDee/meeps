import { Dispatch, SetStateAction } from "react";

type ErrorDispatch = Dispatch<SetStateAction<string>>;

export const handleError = (type: string, setter: ErrorDispatch) => {
  const errTypes: { [key: string]: string } = {
    length:
      "Your meep must be greater than 0 and fewer than 66 characters long.",
    duplicateUser: "A user is already registered under this email address!",
    wrongPassword: "The password you entered appears to be incorrect...",
    badPassword:
      "Your password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one digit, and one special character from the set @$!%*?",
    badEmail: "The format of the input email fails validation!",
    userNotFound:
      "That user doesn't appear to exist ...  Try again or register."
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

export const validateInput = (
  type: string,
  input: ValidationInput,
  setter: ErrorDispatch
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
