export type OrderStatus = "pending" | "processing" | "completed";

export type Order = {
  id: number;
  customer: string;
  total: number;
  status: OrderStatus;
};

export type OrderFormData = {
  customer: string;
  total: number;
  status: OrderStatus;
};
