import { useQuery } from "@tanstack/react-query";

const fetchDashboard = async () => {
  const res = await fetch("http://localhost:3000/dashboard");

  if (!res.ok) {
    throw new Error("Failed to fetch dashboard");
  }

  return res.json();
};

export const useDashboard = () => {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: fetchDashboard,
  });
};