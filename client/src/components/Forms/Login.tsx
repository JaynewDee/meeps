import React, { Dispatch, SetStateAction, useState } from "react";
import { API } from "../../api/api";
import { AuthHandle } from "../../auth/auth";
import { handleError } from "../../utils/errors";
import { broadcastSignin } from "../../utils/events";
import { SocketProp } from "../../utils/hooks";
import { SetAuthDisplay } from "../Auth";

interface LoginProps {
  socket: SocketProp;
  setDataStream: Dispatch<SetStateAction<string[]>>;
  setDisplay: SetAuthDisplay;
}

const Login: React.FC<LoginProps> = ({ setDisplay, socket, setDataStream }) => {
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

  const handleSubmitLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const registerRes = await API.login(inputState);
    const res = await registerRes.json();

    if (res.status === 208) {
      handleError("duplicateUser", setErrorState);
      return;
    } else if (res.status === 200 && res.token) {
      AuthHandle.login(res.token);
    }

    broadcastSignin(socket, res.user.email, setDataStream);
  };

  const switchToRegister = () => setDisplay("register");

  return (
    <form className="registration-form" onSubmit={handleSubmitLogin}>
      {errorState && <p className="register-error">{errorState}</p>}
      <div className="registration-form-inputs">
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
      <button type="submit">LOGIN</button>
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