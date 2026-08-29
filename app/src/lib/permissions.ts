import type { User } from "@/services/auth";

export const PERMISSIONS = {
  dashboard: {
    view: "dashboard.view",
  },
  products: {
    view: "products.view",
    manage: "products.manage",
  },
  orders: {
    view: "orders.view",
    manage: "orders.manage",
  },
  customers: {
    view: "customers.view",
    manage: "customers.manage",
  },
  inventory: {
    view: "inventory.view",
    manage: "inventory.manage",
  },
  audit: {
    view: "audit.view",
  },
  users: {
    manage: "users.manage",
  },
} as const;

export function hasPermission(
  user: User | null,
  permission: string
): boolean {
  if (!user) {
    return false;
  }

  if (user.role === "admin") {
    return true;
  }

  return (user.permissions ?? []).includes(permission);
}