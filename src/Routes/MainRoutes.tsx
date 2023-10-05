
import  Dashboard  from "../Pages/Dashboard";
import NoMatch from "../Pages/NoMatch";
import MainLayout from "../layout/MainLayout/index";
import ProtectedRoute from "./ProtectedRoutes";
import NewUser from "../Pages/NewUser";
import AccountInfo from "../Pages/Account Info";
import Wallet from "../Pages/Wallet";
// import MyEarning from "../Pages/MyEarning";
import Setting from "../Pages/Setting";
import ReffralUsers from "../Pages/Reffral Users";
import Transactions from "../Pages/Transactions";
import Invitation from "../Pages/Invitation";

const MainRoutes = {
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
      path: "/adduser/*",
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
      path: "/transactions",
      element: <Transactions />,
    },
    {
      path: "/referralusers",
      element: <ReffralUsers />,
    },
    {
      path: "/invitation",
      element: <Invitation />,
    },
    {
      path: "/setting",
      element: <Setting />,
    },
    {
      path: "*",
      element: <NoMatch />,
    },
  ],
};

export default MainRoutes;