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

type Customer = {
  id: number;
  name: string;
  email: string;
};

type Props = {
  customer: Customer;
  onUpdate?: (data: Customer) => void;
};

export default function UpdateCustomerDialog({ customer, onUpdate }: Props) {
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    name: customer.name,
    email: customer.email,
  });

  function handleSave() {
    const updated = {
      ...customer,
      ...form,
    };

    console.log("Updated Customer:", updated);

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
            <DialogTitle>Update Customer</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label>Name</label>
              <Input
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />
            </div>

            <div>
              <label>Email</label>
              <Input
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />
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