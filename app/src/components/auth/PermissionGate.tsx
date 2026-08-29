import type { ReactNode } from "react";
import useAuth from "@/hooks/useAuth";
import { hasPermission } from "@/lib/permissions";

type Props = {
  permission: string;
  children: ReactNode;
  fallback?: ReactNode;
};

export default function PermissionGate({
  permission,
  children,
  fallback = null,
}: Props) {
  const { user } = useAuth();

  if (!hasPermission(user, permission)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}