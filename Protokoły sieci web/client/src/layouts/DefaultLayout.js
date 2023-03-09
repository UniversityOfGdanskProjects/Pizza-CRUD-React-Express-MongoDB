import React from "react";
import { Outlet } from "react-router-dom";

const DefaultLayout = (props) => {
  return (
    <React.Fragment>
        <Outlet />
    </React.Fragment>
  );
};

export default DefaultLayout;
