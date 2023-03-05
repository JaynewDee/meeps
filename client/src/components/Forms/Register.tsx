import React, { Dispatch, SetStateAction, useState } from "react";
import { AuthHandle } from "../../api/auth";
import { handleError } from "../../utils/errors";
import { SetAuthDisplay } from "../Auth";

const Register = ({ setDisplay }: { setDisplay: SetAuthDisplay }) => {
  const [displayState, setDisplayState] = useState("register");
  const [inputState, setInputState] = useState({
    firstName: "",
    lastName: "",
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
    const registerRes = await AuthHandle.register(inputState);
    const parsed = await registerRes.json();
    if (parsed.status === 208) {
      handleError("duplicateUser", setErrorState);
    }
  };

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
