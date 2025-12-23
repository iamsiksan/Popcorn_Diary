import { Navigate, Outlet } from "react-router-dom";

const ProtectedLayout = ({ isLoggedIn }) => {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedLayout;
