import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/services/api";

export type DashboardData = {
  totalOrders: number;
  totalProducts: number;
  totalCustomers: number;
  monthlyOrders: { month: string; count: number }[];
  recentOrders: {
    id: number;
    order_number: string;
    status: string;
    total_amount: number;
    created_at: string;
  }[];
};

async function fetchDashboard(): Promise<DashboardData> {
  const res = await apiFetch("/api/dashboard");

  if (!res.ok) {
    throw new Error("Failed to fetch dashboard");
  }

  return res.json();
}

export const useDashboard = () => {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: fetchDashboard,
  });
};
