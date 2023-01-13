import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    setErrorText("");
    if (name == "" || email == "" || password == "") {
      setErrorText("Please fill out all the required fields!");
      return false;
    }
    if (password.length < 8) {
      setErrorText("Password must be at least 8 characters!");
      return false;
    }
    const response = await fetch(`http://localhost:8080/api/v1/user/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    const res = await response.json();
    if (res?.message?.includes("duplicate key")) {
      alert("User already exists! Proceed to login!");
      navigate("/login");
    }
    if (res.status == "ok") {
      alert("Signup successful!");
      navigate("/login");
    }
  };
  return (
    <>
      <p>{errorText}</p>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Name*"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
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
        <input type="submit" value="Signup" />
      </form>
      <br />
      <Link to="/login">Login</Link>
    </>
  );
};

export default Signup;
