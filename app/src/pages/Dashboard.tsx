import OrdersChart from "@/components/charts/OrdersChart";


export default function Dashboard() {
  const data = {
    total_orders: 120,
    total_products: 45,
    total_customers: 78,
  };

  const chartData = [
    { month: "Jan", orders: 20 },
    { month: "Feb", orders: 35 },
    { month: "Mar", orders: 50 },
    { month: "Apr", orders: 40 },
    { month: "May", orders: 70 },
    { month: "Jun", orders: 90 },
  ];

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-6">OMS Dashboard</h1>

      {/* KPI CARDS */}
      <div className="grid grid-cols-3 gap-4">
        <div className="border rounded-xl p-4">
          <h2>Total Orders</h2>
          <p className="text-2xl font-bold">{data.total_orders}</p>
        </div>

        <div className="border rounded-xl p-4">
          <h2>Total Products</h2>
          <p className="text-2xl font-bold">{data.total_products}</p>
        </div>

        <div className="border rounded-xl p-4">
          <h2>Total Customers</h2>
          <p className="text-2xl font-bold">{data.total_customers}</p>
        </div>
      </div>

      {/* CHART SECTION */}
      <div className="border rounded-xl p-4">
        <h2 className="text-xl font-semibold mb-4">
          Orders Trend
        </h2>

        <div className="h-[300px]">
          <OrdersChart data={chartData} />
        </div>
      </div>
    </div>
  );
}