import { apiFetch, getApiErrorMessage } from "./api";

export interface StockTransaction {
  id: number;
  product_id: number;
  quantity: number;
  type: string;
  cost_price: string | number | null;
  note: string | null;
  created_by: number | null;
  created_at: string;
}

export interface LowStockItem {
  id: number;
  name: string;
  stock: number;
  reorder_level: number | null;
}

export type CreateStockTransactionPayload = {
  product_id: number;
  quantity: number;
  type: string;
  cost_price?: number | null;
  note?: string | null;
};

export async function getStockTransactions(
  productId?: number
): Promise<StockTransaction[]> {
  const query = productId ? `?product_id=${productId}` : "";
  const response = await apiFetch(`/api/stock-transactions${query}`);

  if (!response.ok) {
    throw new Error(
      await getApiErrorMessage(response, "Failed to fetch stock transactions")
    );
  }

  return response.json();
}

export async function getLowStock(): Promise<LowStockItem[]> {
  const response = await apiFetch("/api/stock-transactions/alerts");

  if (!response.ok) {
    throw new Error(
      await getApiErrorMessage(response, "Failed to fetch low stock alerts")
    );
  }

  return response.json();
}

export async function createStockTransaction(
  data: CreateStockTransactionPayload
) {
  const response = await apiFetch("/api/stock-transactions", {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(
      await getApiErrorMessage(response, "Failed to create stock transaction")
    );
  }

  return response.json();
}
