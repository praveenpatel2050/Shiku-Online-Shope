
import Login from "../Pages/Login/index";
import MinimalLayout from "../layout/MinimalLayout/index";
import HomePage from "../Pages/HomePage";
import Register from "../Pages/Register";
import PolicyPage from "../_component/ui/policy";

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
      path: '/policy',
      element: <PolicyPage />
    },
    {
      path: '/superuser',
      element: <Login />
    },
    {
      path: '/register/:id/*',
      element: <Register />
    } 
  ],
};

export default AuthenticationRoutes;
