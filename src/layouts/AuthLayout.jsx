import { Navigate, Outlet } from "react-router-dom";

function AuthLayout({ isLoggedIn }) {
  
  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 ">
      <Outlet />
    </div>
  );
}

export default AuthLayout;
