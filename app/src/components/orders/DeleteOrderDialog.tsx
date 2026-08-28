import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDeleteOrder } from "@/hooks/userOrders";

type Props = {
  orderId: number;
};

export default function DeleteOrderDialog({ orderId }: Props) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const deleteOrder = useDeleteOrder();

  async function handleDelete() {
    try {
      await deleteOrder.mutateAsync(orderId);
      setOpen(false);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to delete order."
      );
    }
  }

  return (
    <>
      <Button
        size="sm"
        variant="outline"
        className="text-red-600 hover:text-red-600"
        onClick={() => setOpen(true)}
      >
        Delete
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Order #{orderId}</DialogTitle>
          </DialogHeader>

          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete order #{orderId}? This action
            cannot be undone.
          </p>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleteOrder.isPending}
            >
              {deleteOrder.isPending ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
