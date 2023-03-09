import React from "react";
import useAuth from "../hooks/useAuth";

const LoggedInPage = () => {

  const { username, status } = useAuth();

  return (
    <main>
      <h1>Welcome { username }!</h1>
    </main>
  );
}
 
export default LoggedInPage;