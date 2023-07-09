import React from "react";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";

import theme from "../../Theme/index";
import Dashboard from "../../Pages/Dashboard";
import HomePage from "../../Pages/HomePage";

const MinimalLayout = () => {
  return (
    <ThemeProvider theme={theme}>
      <Outlet />
    </ThemeProvider>
  );
};

export default MinimalLayout;
