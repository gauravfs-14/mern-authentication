import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  function logout(e) {
    e.preventDefault();
    window.localStorage.removeItem("token");
    navigate("/login");
  }
  return (
    <>
      <button onClick={(e) => logout(e)}>Logout</button>
    </>
  );
};
export default Logout;
