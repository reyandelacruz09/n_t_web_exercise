import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUpdateCustomer } from "@/hooks/useCustomers";
import type { Customer } from "@/services/customers";

type Props = {
  customer: Customer;
};

export default function UpdateCustomerDialog({ customer }: Props) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    first_name: customer.first_name,
    last_name: customer.last_name,
    email: customer.email,
    phone: customer.phone,
  });
  const [error, setError] = useState("");

  const updateCustomer = useUpdateCustomer();

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);

    if (nextOpen) {
      setForm({
        first_name: customer.first_name,
        last_name: customer.last_name,
        email: customer.email,
        phone: customer.phone,
      });
      setError("");
    }
  }

  async function handleSave() {
    if (!form.first_name.trim() || !form.last_name.trim()) {
      setError("First name and last name are required.");
      return;
    }

    if (!form.email.trim()) {
      setError("Email is required.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!form.phone.trim()) {
      setError("Phone is required.");
      return;
    }

    try {
      await updateCustomer.mutateAsync({
        id: customer.id,
        data: {
          first_name: form.first_name.trim(),
          last_name: form.last_name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
        },
      });

      setOpen(false);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to update customer. Please try again."
      );
    }
  }

  return (
    <>
      <Button size="sm" variant="outline" onClick={() => handleOpenChange(true)}>
        Update
      </Button>

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Customer #{customer.id}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="update-customer-first-name">First Name</Label>
              <Input
                id="update-customer-first-name"
                value={form.first_name}
                onChange={(e) =>
                  setForm({ ...form, first_name: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="update-customer-last-name">Last Name</Label>
              <Input
                id="update-customer-last-name"
                value={form.last_name}
                onChange={(e) =>
                  setForm({ ...form, last_name: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="update-customer-email">Email</Label>
              <Input
                id="update-customer-email"
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="update-customer-phone">Phone</Label>
              <Input
                id="update-customer-phone"
                type="tel"
                value={form.phone}
                onChange={(e) =>
                  setForm({ ...form, phone: e.target.value })
                }
              />
            </div>

            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>

            <Button onClick={handleSave} disabled={updateCustomer.isPending}>
              {updateCustomer.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
