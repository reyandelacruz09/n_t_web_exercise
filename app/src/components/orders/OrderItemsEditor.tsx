import { Plus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Product } from "@/services/products";
import { getOrderItemsTotal, emptyItemRow, type OrderItemFormRow } from "./orderItemsForm";

type Props = {
  products: Product[];
  rows: OrderItemFormRow[];
  onChange: (rows: OrderItemFormRow[]) => void;
};

export default function OrderItemsEditor({
  products,
  rows,
  onChange,
}: Props) {
  function handleRowChange(
    index: number,
    patch: Partial<OrderItemFormRow>
  ) {
    onChange(rows.map((row, i) => (i === index ? { ...row, ...patch } : row)));
  }

  function handleRemoveRow(index: number) {
    onChange(rows.filter((_, i) => i !== index));
  }

  const total = getOrderItemsTotal(rows, products);

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Products</label>

      <div className="space-y-2">
        {rows.map((row, index) => {
          const selected = products.find(
            (p) => p.id === Number(row.product_id)
          );

          return (
            <div key={index} className="flex items-center gap-2">
              <select
                aria-label="Product"
                className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                value={row.product_id}
                onChange={(e) =>
                  handleRowChange(index, { product_id: e.target.value })
                }
              >
                <option value="">Select a product</option>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name} (₱{Number(product.price).toFixed(2)}) —{" "}
                    {product.stock} in stock
                  </option>
                ))}
              </select>

              <Input
                aria-label="Quantity"
                type="number"
                min="1"
                step="1"
                className="w-20"
                placeholder="Qty"
                value={row.quantity}
                onChange={(e) =>
                  handleRowChange(index, { quantity: e.target.value })
                }
              />

              <span className="w-20 shrink-0 text-right text-sm tabular-nums text-muted-foreground">
                ₱
                {selected && row.quantity
                  ? (Number(selected.price) * Number(row.quantity)).toFixed(2)
                  : "0.00"}
              </span>

              <Button
                type="button"
                size="icon"
                variant="ghost"
                aria-label={`Remove item ${index + 1}`}
                disabled={rows.length === 1}
                onClick={() => handleRemoveRow(index)}
              >
                <X className="size-4" />
              </Button>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between">
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => onChange([...rows, { ...emptyItemRow }])}
        >
          <Plus className="size-4" />
          Add Product
        </Button>

        <p className="text-sm">
          Total:{" "}
          <span className="font-semibold tabular-nums">
            ₱{total.toFixed(2)}
          </span>
        </p>
      </div>
    </div>
  );
}
