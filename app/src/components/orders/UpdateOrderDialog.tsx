import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

type Order = {
  id: number;
  customer: string;
  total: number;
  status: "pending" | "processing" | "completed";
};

type Props = {
  order: Order;
  onUpdate?: (data: Order) => void;
};

export default function UpdateOrderDialog({
  order,
  onUpdate,
}: Props) {
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    customer: order.customer,
    total: order.total,
    status: order.status,
  });

  function handleSave() {
    const updated: Order = {
      ...order,
      ...form,
    };

    console.log("Updated Order:", updated);

    onUpdate?.(updated);
    setOpen(false);
  }

  return (
    <>
      {/* BUTTON INSIDE COMPONENT */}
      <Button size="sm" variant="outline" onClick={() => setOpen(true)}>
        Update
      </Button>

      {/* MODAL */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Order</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* Customer */}
            <div>
              <label>Customer</label>
              <Input
                value={form.customer}
                onChange={(e) =>
                  setForm({ ...form, customer: e.target.value })
                }
              />
            </div>

            {/* Total */}
            <div>
              <label>Total</label>
              <Input
                type="number"
                value={form.total}
                onChange={(e) =>
                  setForm({
                    ...form,
                    total: Number(e.target.value),
                  })
                }
              />
            </div>

            {/* Status */}
            <div>
              <label>Status</label>
              <select
                className="w-full border rounded px-3 py-2"
                value={form.status}
                onChange={(e) =>
                  setForm({
                    ...form,
                    status: e.target.value as Order["status"],
                  })
                }
              >
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>

            <Button onClick={handleSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}