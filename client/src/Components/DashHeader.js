import React from "react";
import { useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import logo from "../logo.svg";
import { useSendLogoutMutation } from "./auth/authApi-slice";

const DashHeader = () => {
  const { isAdmin } = useAuth();

  const navigate = useNavigate();

  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();

  useEffect(() => {
    if (isSuccess) navigate("/");
  }, [isSuccess, navigate]);

  if (isLoading) return <p>Logging Out...</p>;

  if (isError) return <p>Error: {error?.data?.message}</p>;

  const logoutButton = (
    <button className="logout-button" title="Logout" onClick={sendLogout}>
      Log Out
    </button>
  );

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-logo">
          <Link to="/dash">
            <img src={logo} alt="Logo" className="logo" />
          </Link>
        </div>
        <div className="header-links">
          <li>
            <NavLink to={"/dash/pizzas"}>Pizza Menu</NavLink>
          </li>
          {isAdmin && (
            <li>
              <NavLink to={"/dash/pizzas/new"}>Add Pizza</NavLink>
            </li>
          )}
          <NavLink to="/dash/info">Info</NavLink>
          {logoutButton}
        </div>
      </div>
    </header>
  );
};

export default DashHeader;
