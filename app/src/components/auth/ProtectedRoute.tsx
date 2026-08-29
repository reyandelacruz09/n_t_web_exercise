import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

function ProtectedRoute() {
  const { isAuthenticated, ready } = useAuth();
  const location = useLocation();

  if (!ready) {
    return null;
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return <Outlet />;
}

export default ProtectedRoute;
