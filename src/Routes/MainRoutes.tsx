import React from "react";
import  Dashboard  from "../Pages/Dashboard";
import NoMatch from "../Pages/NoMatch";
import MainLayout from "../layout/MainLayout/index";
import ProtectedRoute from "./ProtectedRoutes";
import NewUser from "../Pages/NewUser";
import AccountInfo from "../Pages/Account Info";
import Wallet from "../Pages/Wallet";
import MyEarning from "../Pages/MyEarning";

const MainRoutes = {
  path: "/",
  element: (
   //<ProtectedRoute>
      <MainLayout />
   //</ProtectedRoute>
  ),
  children: [
    {
      path: "dashboard",
      element: <Dashboard />,
    },
    {
      path: "/newuser",
      element: <NewUser />,
    },
    {
      path: "/account",
      element: <AccountInfo />,
    },
    {
      path: "/wallet",
      element: <Wallet />,
    },
    {
      path: "/myearning",
      element: <MyEarning />,
    },
    {
      path: "*",
      element: <NoMatch />,
    },
  ],
};

export default MainRoutes;
