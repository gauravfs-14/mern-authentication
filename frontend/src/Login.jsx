import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
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
    try {
      const response = await fetch(`http://localhost:8080/api/v1/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const res = await response.json();
      // console.log(res);
      if (!window.localStorage.getItem("token")) {
        window.localStorage.setItem("token", res.token);
      }
      if (res.status == "ok") {
        navigate("/dashboard");
      } else {
        setErrorText(res.message);
      }
    } catch (err) {
      setErrorText(err.message);
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
      <br />
      <Link to="/signup">Signup</Link>
    </>
  );
};

export default Login;
