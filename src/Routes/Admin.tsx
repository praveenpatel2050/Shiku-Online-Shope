
import  Dashboard  from "../Pages/Dashboard";
import NoMatch from "../Pages/NoMatch";
import MainLayout from "../layout/MainLayout/index";
import ProtectedRoute from "./ProtectedRoutes";
import AllUserList from "../Pages/AllUserLIst";
import UserDetails from "../Pages/UserDetails";
import DeliveryStatus from "../Pages/DeliveryStatus";
import UserRequest from "../Pages/Paymentrequest";
import WithdrawalRequest from "../Pages/withdrawalRequest";
import ProductPlans from "../Pages/PlanAdd";
import EditPage from "../Pages/PlanAdd/editplan";
import AddPlan from "../Pages/PlanAdd/addPlan";
import NewUser from "../Pages/NewUser";


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
      path: "/adduser",
      element: <NewUser />,
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
      path: "/add-user-request",
      element: <UserRequest />,
    },
    {
      path: "/withdrawal-request",
      element: <WithdrawalRequest />,
    },
    {
      path: '/product-plans',
      element: <ProductPlans />
    },
    {
      path: '/edit-product/:id',
      element: <EditPage />
    },
    {
     path: '/add-product/',
     element: <AddPlan />
    },
    {
      path: "*",
      element: <NoMatch />,
    },
  ],
};

export default Admin;