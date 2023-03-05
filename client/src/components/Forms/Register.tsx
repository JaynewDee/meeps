import React, { useState } from "react";
import { AuthHandle } from "../../api/auth";

const Register = () => {
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value
    });
  };

  const handleSubmitRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formState);
    await AuthHandle.register(formState);
  };

  return (
    <form className="registration-form" onSubmit={handleSubmitRegistration}>
      <input
        type="text"
        name="firstName"
        placeholder="first name"
        value={formState.firstName}
        onChange={handleInput}
      />
      <input
        type="text"
        name="lastName"
        placeholder="last name"
        value={formState.lastName}
        onChange={handleInput}
      />
      <input
        type="text"
        name="email"
        placeholder="email"
        value={formState.email}
        onChange={handleInput}
      />
      <input
        type="password"
        name="password"
        placeholder="password"
        value={formState.password}
        onChange={handleInput}
      />
      <button type="submit">REGISTER</button>
    </form>
  );
};

export default Register;
