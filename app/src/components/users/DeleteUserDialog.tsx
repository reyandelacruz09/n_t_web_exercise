import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDeleteUser } from "@/hooks/useUsers";

type Props = {
  userId: number;
  username: string;
  disabled?: boolean;
};

export default function DeleteUserDialog({ userId, username, disabled }: Props) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const deleteUser = useDeleteUser();

  async function handleDelete() {
    try {
      await deleteUser.mutateAsync(userId);
      setOpen(false);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to delete user."
      );
    }
  }

  return (
    <>
      <Button
        size="sm"
        variant="outline"
        className="text-red-600 hover:text-red-600"
        disabled={disabled}
        onClick={() => setOpen(true)}
      >
        Delete
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
          </DialogHeader>

          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete <strong>{username}</strong>? This
            action cannot be undone.
          </p>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleteUser.isPending}
            >
              {deleteUser.isPending ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}