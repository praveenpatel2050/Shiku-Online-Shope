
import { Navigate, useLocation } from "react-router-dom";

import { useAppSelector } from "../hooks/hook";
import { selectAuth } from "../store/userAuth/authSlice";

// ProtectedRoute:: Protected routes area accessible to logged in users only.
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const auth = useAppSelector(selectAuth);
  const location = useLocation();
  if (!auth.isLoggedIn) {
    return <Navigate to="/homepage" state={{ from: location }} replace />;
  }
  return children;
};

export default ProtectedRoute;
