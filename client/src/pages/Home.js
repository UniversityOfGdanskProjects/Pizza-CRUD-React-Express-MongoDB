import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleLogIn = () => navigate("/login");

  return (
    <main>
      <h1>Home page!</h1>
      <button className="login-btn" onClick={handleLogIn}>Log In</button>
    </main>
  );
};

export default Home;
