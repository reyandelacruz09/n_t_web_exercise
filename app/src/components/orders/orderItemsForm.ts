import type { Product } from "@/services/products";

export type OrderItemFormRow = {
  product_id: string;
  quantity: string;
};

export const emptyItemRow: OrderItemFormRow = {
  product_id: "",
  quantity: "1",
};

export function getOrderItemsTotal(
  rows: OrderItemFormRow[],
  products: Product[]
) {
  return rows.reduce((sum, row) => {
    const product = products.find((p) => p.id === Number(row.product_id));

    if (!product || !row.quantity) {
      return sum;
    }

    return sum + Number(product.price) * Number(row.quantity);
  }, 0);
}
