import React from "react";
import Login from "../Pages/Login/index";
import MinimalLayout from "../layout/MinimalLayout/index";
import HomePage from "../Pages/HomePage";

const AuthenticationRoutes = {
  path: "/",
  element: <MinimalLayout />,
  children: [
    {
      path: '/homepage',
      element: <HomePage />
    }
  ],
};

export default AuthenticationRoutes;
