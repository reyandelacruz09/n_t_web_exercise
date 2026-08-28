import { Package, ShoppingCart, Users } from "lucide-react";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import OrdersChart from "@/components/charts/OrdersChart";
import { useDashboard } from "@/hooks/useDashboard";

type Kpi = {
  label: string;
  value: number;
  change: string;
  icon: typeof ShoppingCart;
  iconClass: string;
};

export default function Dashboard() {
  const { data, isLoading, error } = useDashboard();

  const kpis: Kpi[] = [
    {
      label: "Total Orders",
      value: data?.totalOrders ?? 0,
      change: "",
      icon: ShoppingCart,
      iconClass: "bg-indigo-500/10 text-indigo-500",
    },
    {
      label: "Total Products",
      value: data?.totalProducts ?? 0,
      change: "",
      icon: Package,
      iconClass: "bg-emerald-500/10 text-emerald-500",
    },
    {
      label: "Total Customers",
      value: data?.totalCustomers ?? 0,
      change: "",
      icon: Users,
      iconClass: "bg-amber-500/10 text-amber-500",
    },
  ];

  const chartData = (data?.monthlyOrders ?? []).map((m) => ({
    month: m.month,
    orders: m.count,
  }));

  if (error) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center p-6">
        <p className="text-destructive">Failed to load dashboard data.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">OMS Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Overview of your orders, products and customers.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {kpis.map((kpi) => (
          <Card key={kpi.label}>
            <CardHeader>
              <CardDescription>{kpi.label}</CardDescription>
              <CardAction>
                <div
                  className={cn(
                    "flex size-9 items-center justify-center rounded-lg",
                    kpi.iconClass
                  )}
                >
                  <kpi.icon className="size-5" />
                </div>
              </CardAction>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="h-9 w-20 animate-pulse rounded bg-muted" />
              ) : (
                <div className="text-3xl font-bold">{kpi.value}</div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chart Card */}
      <Card>
        <CardHeader>
          <CardTitle>Orders Trend</CardTitle>
          <CardDescription>Monthly orders over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[320px]">
            {isLoading ? (
              <div className="flex h-full items-center justify-center text-muted-foreground">
                Loading chart...
              </div>
            ) : (
              <OrdersChart data={chartData} />
            )}
          </div>
        </CardContent>
      </Card>

      {/* Recent Orders Table */}
      {data?.recentOrders && data.recentOrders.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Last 5 orders placed</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-muted-foreground">
                    <th className="pb-2 font-medium">Order #</th>
                    <th className="pb-2 font-medium">Status</th>
                    <th className="pb-2 font-medium text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {data.recentOrders.map((order) => (
                    <tr key={order.id} className="border-b last:border-0">
                      <td className="py-2 font-medium">{order.order_number}</td>
                      <td className="py-2">
                        <span className="inline-block rounded-full bg-muted px-2 py-0.5 text-xs font-medium">
                          {order.status}
                        </span>
                      </td>
                      <td className="py-2 text-right">
                        ₱{Number(order.total_amount).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
