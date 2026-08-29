import { useState } from "react";
import { Search, UserCog, Users as UsersIcon } from "lucide-react";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CreateUserDialog from "@/components/users/CreateUserDialog";
import UpdateUserDialog from "@/components/users/UpdateUserDialog";
import DeleteUserDialog from "@/components/users/DeleteUserDialog";
import { useUsers } from "@/hooks/useUsers";
import useAuth from "@/hooks/useAuth";

const roleBadge: Record<string, string> = {
  admin: "border-violet-500/30 bg-violet-500/10 text-violet-500",
  user: "border-blue-500/30 bg-blue-500/10 text-blue-500",
};

function permissionLabel(permission: string): string {
  return permission
    .split(".")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(".");
}

export default function UserManagement() {
  const { user: currentUser } = useAuth();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const {
    data: users = [],
    isPending,
    error,
  } = useUsers();

  const pageSize = 10;

  const filtered = users.filter((user) =>
    `${user.username} ${user.email}`
      .toLowerCase()
      .includes(search.trim().toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));

  const start = (page - 1) * pageSize;
  const data = filtered.slice(start, start + pageSize);

  function handleSearch(value: string) {
    setSearch(value);
    setPage(1);
  }

  if (isPending) {
    return <div className="p-6">Loading users...</div>;
  }

  if (error instanceof Error) {
    return <div className="p-6 text-red-500">{error.message}</div>;
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-3xl font-bold tracking-tight">
            <UserCog className="size-7" />
            User Management
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage user roles. Access to modules is determined by role and
            permissions.
          </p>
        </div>

        <CreateUserDialog />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User List</CardTitle>
          <CardDescription>{filtered.length} users</CardDescription>

          <CardAction>
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search users..."
                className="w-56 pl-8"
              />
            </div>
          </CardAction>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Permissions</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="py-12">
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <UsersIcon className="size-8" />
                      <p>No users found.</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                data.map((user) => {
                  const isSelf = currentUser?.id === user.id;

                  return (
                    <TableRow key={user.id}>
                      <TableCell className="text-muted-foreground">
                        #{user.id}
                      </TableCell>
                      <TableCell className="font-medium">
                        {user.username}
                        {isSelf && (
                          <span className="ml-2 text-xs text-muted-foreground">
                            (you)
                          </span>
                        )}
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge className={roleBadge[user.role] ?? ""}>
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex max-w-md flex-wrap gap-1">
                          {user.permissions?.map((permission) => (
                            <Badge
                              key={permission}
                              className="font-mono text-[11px]"
                            >
                              {permissionLabel(permission)}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-end gap-2">
                          <UpdateUserDialog user={user} disabled={isSelf} />

                          <DeleteUserDialog
                            userId={user.id}
                            username={user.username}
                            disabled={isSelf}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>

          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing{" "}
              <span className="font-medium text-foreground">
                {filtered.length === 0 ? 0 : start + 1}–
                {Math.min(start + pageSize, filtered.length)}
              </span>{" "}
              of {filtered.length}
            </p>

            <div className="flex gap-2">
              <Button
                variant="outline"
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
              >
                Previous
              </Button>

              <Button
                variant="outline"
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}