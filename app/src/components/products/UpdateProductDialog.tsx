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

type Product = {
    id: number;
    name: string;
    price: number;
    stock: number;
};

type Props = {
    product: Product;
    onUpdate?: (data: Product) => void;
};

export default function UpdateProductDialog({ product, onUpdate }: Props) {
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    name: product.name,
  });

  function handleSave() {
    const updated = {
      ...product,
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
            <DialogTitle>Update Product</DialogTitle>
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

            {/* <div>
              <label>Email</label>
              <Input
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />
            </div> */}
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