import React from "react";
import  Dashboard  from "../Pages/Dashboard";
import NoMatch from "../Pages/NoMatch";
import MainLayout from "../layout/MainLayout/index";
import ProtectedRoute from "./ProtectedRoutes";
import AllUserList from "../Pages/AllUserLIst";


const Admin = {
  path: "/",
  element: (
    <ProtectedRoute>
      <MainLayout />
    </ProtectedRoute>
  ),
  children: [
    {
      path: "dashboard",
      element: <Dashboard />,
    },
    {
      path: "userlist",
      element: <AllUserList />,
    },
    {
      path: "*",
      element: <NoMatch />,
    },
  ],
};

export default Admin;