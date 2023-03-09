import React from "react";
import { Outlet } from "react-router-dom";
import DashHeader from "../Components/DashHeader";
import DashFooter from "../Components/DashFooter";

const DashLayout = (props) => {
  return (
    <React.Fragment>

      <DashHeader />

      <Outlet />

      <DashFooter />

    </React.Fragment>
  );
};

export default DashLayout;
