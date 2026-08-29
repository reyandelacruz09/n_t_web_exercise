import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronDown,
  LogOut,
  Moon,
  Sun,
  UserCircle,
} from "lucide-react";
import { DropdownMenu } from "radix-ui";
import useAuth from "@/hooks/useAuth";
import { useTheme } from "@/hooks/useTheme";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  async function handleLogout() {
    await logout();
    navigate("/login", { replace: true });
  }

  const displayName =
    user?.username ?? (user?.email ? user.email.split("@")[0] : "User");
  const initial = displayName[0]?.toUpperCase() ?? "?";

  return (
    <div className="flex h-16 items-center justify-between border-b px-6">
      <h1 className="font-semibold">Order Management System</h1>

      <DropdownMenu.Root open={open} onOpenChange={setOpen}>
        <DropdownMenu.Trigger asChild>
          <Button variant="outline" size="sm">
            <span className="flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
              {initial}
            </span>
            <span>{displayName}</span>
            <ChevronDown className="size-3.5 text-muted-foreground" />
          </Button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content
          sideOffset={6}
          align="end"
          className={cn(
            "z-50 min-w-[12rem] rounded-lg border border-border bg-popover p-1 text-popover-foreground shadow-md",
            "data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95"
          )}
        >
          <DropdownMenu.Item
            onSelect={() => {
              setOpen(false);
              navigate("/profile");
            }}
            className="flex cursor-default select-none items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-none hover:bg-muted data-highlighted:bg-muted"
          >
            <UserCircle className="size-4" />
            Profile
          </DropdownMenu.Item>

          <DropdownMenu.Item
            onSelect={toggleTheme}
            className="flex cursor-default select-none items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-none hover:bg-muted data-highlighted:bg-muted"
          >
            {theme === "dark" ? (
              <Sun className="size-4" />
            ) : (
              <Moon className="size-4" />
            )}
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </DropdownMenu.Item>

          <DropdownMenu.Separator className="my-1 h-px bg-border" />

          <DropdownMenu.Item
            onSelect={handleLogout}
            className="flex cursor-default select-none items-center gap-2 rounded-md px-2 py-1.5 text-sm text-red-600 outline-none hover:bg-red-500/10 data-highlighted:bg-red-500/10"
          >
            <LogOut className="size-4" />
            Logout
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
}
