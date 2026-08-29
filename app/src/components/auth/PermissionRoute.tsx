import { Navigate, Outlet } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import { hasPermission } from "@/lib/permissions";

type Props = {
  permission: string;
};

function PermissionRoute({ permission }: Props) {
  const { user } = useAuth();

  if (!hasPermission(user, permission)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default PermissionRoute;