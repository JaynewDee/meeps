import { catchAsync } from "catch-flow";
import React, { Dispatch, SetStateAction, useState } from "react";
import { API } from "../../api/api";
import { AuthHandle } from "../../auth/auth";
import { handleError, validateInput } from "../../utils/errors";
import { broadcastSignin } from "../../utils/events";
import { SocketProp } from "../../utils/hooks";
import { SetAuthDisplay } from "../Auth";

const defaultState = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  password: ""
};

interface RegisterProps {
  socket: SocketProp;
  setDisplay: SetAuthDisplay;
}

const Register: React.FC<RegisterProps> = ({ setDisplay, socket }) => {
  const [inputState, setInputState] = useState(defaultState);
  const [errorState, setErrorState] = useState("");

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputState({
      ...inputState,
      [name]: value
    });
  };

  const handleSubmitRegistration = catchAsync(async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateInput("auth", inputState, setErrorState) !== "pass") {
      return;
    }
    const res = await API.register(inputState);

    if (res.status === 208) {
      handleError("duplicateUser", setErrorState);
      return;
    } else if (res.status === 200 && res.token) {
      AuthHandle.login(res.token);
    }
  });

  const switchToLogin = () => setDisplay("login");

  return (
    <form className="registration-form" onSubmit={handleSubmitRegistration}>
      {errorState && <p className="register-error">{errorState}</p>}
      <div className="registration-form-inputs">
        <input
          type="text"
          name="firstName"
          placeholder="first name"
          value={inputState.firstName}
          onChange={handleInput}
        />
        <input
          type="text"
          name="lastName"
          placeholder="last name"
          value={inputState.lastName}
          onChange={handleInput}
        />
        <input
          type="text"
          name="username"
          placeholder="username"
          value={inputState.username}
          onChange={handleInput}
        />
        <input
          type="text"
          name="email"
          placeholder="email"
          value={inputState.email}
          onChange={handleInput}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={inputState.password}
          onChange={handleInput}
        />
      </div>
      <button type="submit">REGISTER</button>
      <p
        style={{
          marginBottom: "0",
          marginTop: "2rem",
          fontSize: ".66rem"
        }}
      >
        Already registered?
      </p>
      <p className="login-form-switch" onClick={switchToLogin}>
        LOG IN
      </p>
    </form>
  );
};

export default Register;
