import React, { useState } from "react";
import { AuthHandle } from "../../api/auth";
import { handleError } from "../../utils/errors";
import { SetAuthDisplay } from "../Auth";

const Login = ({ setDisplay }: { setDisplay: SetAuthDisplay }) => {
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

  const handleSubmitRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  const switchToRegister = () => setDisplay("register");

  return (
    <form className="registration-form" onSubmit={handleSubmitRegistration}>
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
        Already registered?
      </p>
      <p className="register-form-switch" onClick={switchToRegister}>
        REGISTER
      </p>
    </form>
  );
};

export default Login;
