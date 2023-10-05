
import  Dashboard  from "../Pages/Dashboard";
import NoMatch from "../Pages/NoMatch";
import MainLayout from "../layout/MainLayout/index";
import ProtectedRoute from "./ProtectedRoutes";
import AllUserList from "../Pages/AllUserLIst";
import UserDetails from "../Pages/UserDetails";
import DeliveryStatus from "../Pages/DeliveryStatus";


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
      path: "/userlist/details/user/:id",
      element: <UserDetails />,
    },
    {
      path: "/delivery",
      element: <DeliveryStatus />,
    },
    {
      path: "*",
      element: <NoMatch />,
    },
  ],
};

export default Admin;