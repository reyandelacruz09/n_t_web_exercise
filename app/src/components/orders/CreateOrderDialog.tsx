import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import OrderForm from "./OrderForm";
import type { Order, OrderFormData } from "@/types/order";

type Props = {
  onCreate: (newOrder: Order) => void;
};

const emptyForm: OrderFormData = {
  customer: "",
  total: 0,
  status: "pending",
};

export default function CreateOrderDialog({ onCreate }: Props) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<OrderFormData>(emptyForm);

  function handleCreate() {
    if (!form.customer.trim()) {
      alert("Customer is required.");
      return;
    }

    if (form.total <= 0) {
      alert("Total must be greater than zero.");
      return;
    }

    const newOrder: Order = {
      id: Date.now(),
      ...form,
    };

    onCreate(newOrder);

    setForm(emptyForm);
    setOpen(false);
  }

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);

    // Reset fields when Add Order is opened.
    if (nextOpen) {
      setForm(emptyForm);
    }
  }

  return (
    <>
      <Button onClick={() => handleOpenChange(true)}>
        Add Order
      </Button>

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Order</DialogTitle>
          </DialogHeader>

          <OrderForm form={form} onChange={setForm} />

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>

            <Button onClick={handleCreate}>
              Create Order
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}