import { Input } from "@/components/ui/input";

export type OrderStatus = "pending" | "processing" | "completed";

export type OrderFormData = {
  customer: string;
  total: number;
  status: OrderStatus;
};

type Props = {
  form: OrderFormData;
  onChange: (form: OrderFormData) => void;
};

export default function OrderForm({ form, onChange }: Props) {
  return (
    <div className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium">Customer</label>
        <Input
          value={form.customer}
          placeholder="Enter customer name"
          onChange={(e) =>
            onChange({
              ...form,
              customer: e.target.value,
            })
          }
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Total</label>
        <Input
          type="number"
          min="0"
          step="0.01"
          value={form.total || ""}
          placeholder="0.00"
          onChange={(e) =>
            onChange({
              ...form,
              total: Number(e.target.value),
            })
          }
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Status</label>
        <select
          className="w-full rounded border px-3 py-2"
          value={form.status}
          onChange={(e) =>
            onChange({
              ...form,
              status: e.target.value as OrderFormData["status"],
            })
          }
        >
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="completed">Completed</option>
        </select>
      </div>
    </div>
  );
}