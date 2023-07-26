import React from "react";
import Login from "../Pages/Login/index";
import MinimalLayout from "../layout/MinimalLayout/index";
import HomePage from "../Pages/HomePage";
import Register from "../Pages/Register";

const AuthenticationRoutes = {
  path: "/",
  element: <MinimalLayout />,
  children: [
    {
      path: '/homepage',
      element: <HomePage />
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/register/:id/*',
      element: <Register />
    } 
  ],
};

export default AuthenticationRoutes;
