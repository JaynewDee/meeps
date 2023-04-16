import React, { useState } from "react";
import { API } from "../../api/api";
import { SessionAuthHandle } from "../../auth/auth";
import { useAuthValidation, SocketProp, handleError } from "../../hooks";
import { SetAuthDisplay } from "../Auth";
import { useUserContext } from "../../context";

interface LoginProps {
  socket: SocketProp;
  setDisplay: SetAuthDisplay;
}

const Login: React.FC<LoginProps> = ({ setDisplay, socket }) => {
  const [inputState, setInputState] = useState({
    email: "",
    password: ""
  });

  const [errorState, setErrorState] = useState("");

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputState({
      ...inputState,
      [name]: value
    });
  };

  const { login } = useUserContext();

  const handleSubmitLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (useAuthValidation("auth", inputState, setErrorState) !== "pass") {
      return;
    }

    const res = await API.login(inputState);

    const { status } = res;

    if (status === 401) {
      return handleError("wrongPassword", setErrorState);
    } else if (status === 400) {
      return handleError("userNotFound", setErrorState);
    } else if (status === 208) {
      return handleError("duplicateUser", setErrorState);
    } else if (status === 200 && res.token) {
      SessionAuthHandle.login(res.token);
      login();
    }
  };

  const switchToRegister = () => setDisplay("register");

  return (
    <form className="registration-form" onSubmit={handleSubmitLogin}>
      {errorState && <p className="register-error">{errorState}</p>}
      <div className="auth-form-inputs">
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
      <button type="submit" className="auth-submit">
        LOGIN
      </button>
      <p
        style={{
          marginBottom: "0",
          marginTop: "2rem",
          fontSize: ".66rem"
        }}
      >
        First time here?
      </p>
      <p className="register-form-switch" onClick={switchToRegister}>
        REGISTER
      </p>
    </form>
  );
};

export default Login;
