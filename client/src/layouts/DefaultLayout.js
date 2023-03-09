import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../Components/Header";

const DefaultLayout = () => {

  const { pathname } = useLocation();

  let header = pathname.includes("dash") ? null : < Header />

  return (
    <React.Fragment>
      {header}
      <Outlet />
    </React.Fragment>
  );
};

export default DefaultLayout;