import { useRoutes } from "react-router-dom";

//routes
import AuthenticationRoutes from "./AuthenticationRoutes";
import Admin from "./Admin";
const AdminRoutes = () => useRoutes([Admin, AuthenticationRoutes]);

export default AdminRoutes;
