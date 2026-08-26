import { Package, ShoppingCart, TrendingUp, Users } from "lucide-react";

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

type Kpi = {
  label: string;
  value: number;
  change: string;
  icon: typeof ShoppingCart;
  iconClass: string;
};

const KPIS: Kpi[] = [
  {
    label: "Total Orders",
    value: 120,
    change: "+12% vs last month",
    icon: ShoppingCart,
    iconClass: "bg-indigo-500/10 text-indigo-500",
  },
  {
    label: "Total Products",
    value: 45,
    change: "+4 new this month",
    icon: Package,
    iconClass: "bg-emerald-500/10 text-emerald-500",
  },
  {
    label: "Total Customers",
    value: 78,
    change: "+8% vs last month",
    icon: Users,
    iconClass: "bg-amber-500/10 text-amber-500",
  },
];

const CHART_DATA = [
  { month: "Jan", orders: 20 },
  { month: "Feb", orders: 35 },
  { month: "Mar", orders: 50 },
  { month: "Apr", orders: 40 },
  { month: "May", orders: 70 },
  { month: "Jun", orders: 90 },
];

export default function Dashboard() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">OMS Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Overview of your orders, products and customers.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {KPIS.map((kpi) => (
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
              <div className="text-3xl font-bold">{kpi.value}</div>
              <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                <TrendingUp className="size-3.5 text-emerald-500" />
                {kpi.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Orders Trend</CardTitle>
          <CardDescription>
            Monthly orders over the last 6 months
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="h-[320px]">
            <OrdersChart data={CHART_DATA} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
