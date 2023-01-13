import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logout from "./Logout";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (!window.localStorage.getItem("token")) {
      navigate("/login");
    }
    const fetchData = async () => {
      const response = await fetch("http://localhost:8080/api/v1/user/data", {
        method: "GET",
        headers: {
          "x-access-token": window.localStorage.getItem("token"),
        },
      });
      const res = await response.json();
      setUserData(res?.user);
      // console.log(res);
      if (res.status == "error") {
        navigate("/login");
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <h1>Welcome {userData?.name?.toUpperCase()}</h1>
      <Logout />
    </>
  );
};

export default Dashboard;
