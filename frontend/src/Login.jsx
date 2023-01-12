import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    setErrorText("");
    if (email == "" || password == "") {
      setErrorText("Please fill out all the required fields!");
      return false;
    }
    if (password.length < 8) {
      setErrorText("Password must be at least 8 characters!");
      return false;
    }
  };
  return (
    <>
      <p>{errorText}</p>
      <form onSubmit={submitHandler}>
        <input
          type="email"
          placeholder="Email*"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Password*"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <input type="submit" value="Login" />
      </form>
    </>
  );
};

export default Login;
