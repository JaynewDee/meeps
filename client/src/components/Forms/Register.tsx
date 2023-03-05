import React, { useState } from "react";

const Register = () => {
  const [formState, setFormState] = useState({
    first: "",
    last: "",
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

  return (
    <form>
      <input
        type="text"
        name="first"
        value={formState.first}
        onChange={handleInput}
      />
      <input
        type="text"
        name="last"
        value={formState.last}
        onChange={handleInput}
      />
      <input
        type="text"
        name="email"
        value={formState.email}
        onChange={handleInput}
      />
      <input
        type="password"
        name="password"
        value={formState.password}
        onChange={handleInput}
      />
    </form>
  );
};

export default Register;
