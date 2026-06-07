import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
  } from "recharts";

  type Props = {
    data: { month: string; orders: number }[];
  };

  export default function OrdersChart({ data }: Props) {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="orders" stroke="#6366f1" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    );
  }