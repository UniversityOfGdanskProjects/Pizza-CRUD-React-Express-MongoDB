import React from "react";
import useAuth from "../hooks/useAuth";

const DashFooter = () => {

  const { username, status } = useAuth();

  return (
    <footer>
      <p>Current user: {username}</p>
      <p>Status: {status}</p>
    </footer>
  );
}
 
export default DashFooter;