import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useUpdateUser } from "@/hooks/useUsers";
import type { ManagedUser } from "@/services/users";

type Props = {
  user: ManagedUser;
  disabled?: boolean;
};

export default function UpdateUserDialog({ user, disabled }: Props) {
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState(user.role);
  const [error, setError] = useState("");

  const updateUser = useUpdateUser();

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);

    if (nextOpen) {
      setRole(user.role);
      setError("");
    }
  }

  async function handleSave() {
    if (role === user.role) {
      setOpen(false);
      return;
    }

    try {
      await updateUser.mutateAsync({
        id: user.id,
        data: { role },
      });

      setOpen(false);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to update user. Please try again."
      );
    }
  }

  return (
    <>
      <Button
        size="sm"
        variant="outline"
        disabled={disabled}
        onClick={() => handleOpenChange(true)}
      >
        Edit
      </Button>

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Edit User — {user.username}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor={`user-role-${user.id}`}>Role</Label>
              <select
                id={`user-role-${user.id}`}
                className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>

            <Button onClick={handleSave} disabled={updateUser.isPending}>
              {updateUser.isPending ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}