import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import logo from "../logo.svg";

const Header = () => {

  const navigate = useNavigate();

  const handeLogin = () => navigate("/login")

  const loginButton = (
    <button className="login-button" title="Login" onClick={handeLogin}>
      Log In
    </button>
  );

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-logo">
          <Link to="/">
            <img src={logo} alt="Logo" className="logo" />
          </Link>
        </div>
        <div className="header-links">
          <NavLink to="/info">Info</NavLink>
          {loginButton}
        </div>
      </div>
    </header>
  );
};

export default Header;