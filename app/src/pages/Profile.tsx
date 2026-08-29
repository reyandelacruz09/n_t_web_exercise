import { useState } from "react";
import { KeyRound, Save, UserRound } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useAuth from "@/hooks/useAuth";
import { updateProfile } from "@/services/auth";

export default function Profile() {
  const { user, updateUser } = useAuth();

  const [username, setUsername] = useState(user?.username ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const infoChanged =
    username !== (user?.username ?? "") || email !== (user?.email ?? "");

  const passwordChanged =
    newPassword !== "" || currentPassword !== "" || confirmPassword !== "";

  async function handleSaveInfo(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const result = await updateProfile({
        username: username.trim(),
        email: email.trim(),
      });

      updateUser(result.user);
      setMessage({ type: "success", text: "Profile info updated." });
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Failed to update info.",
      });
    } finally {
      setSaving(false);
    }
  }

  async function handleChangePassword(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setMessage(null);

    if (newPassword !== confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match." });
      setSaving(false);
      return;
    }

    try {
      await updateProfile({
        current_password: currentPassword,
        new_password: newPassword,
      });

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setMessage({ type: "success", text: "Password updated." });
    } catch (err) {
      setMessage({
        type: "error",
        text:
          err instanceof Error ? err.message : "Failed to update password.",
      });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="flex items-center gap-2 text-3xl font-bold tracking-tight">
          <UserRound className="size-7" />
          Profile
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          View and update your account information.
        </p>
      </div>

      {message && (
        <p
          role="status"
          className={
            message.type === "success"
              ? "rounded-md bg-emerald-500/10 p-3 text-sm text-emerald-600"
              : "rounded-md bg-destructive/10 p-3 text-sm text-destructive"
          }
        >
          {message.text}
        </p>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
          <CardDescription>
            Update your username and email address.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSaveInfo}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Your username"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="flex items-center">
              <Button
                type="submit"
                disabled={saving || !infoChanged}
              >
                <Save className="size-4" />
                {saving ? "Saving..." : "Save Info"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <KeyRound className="size-5" />
            Change Password
          </CardTitle>
          <CardDescription>
            Set a new password. Your current password is required.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleChangePassword}>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center">
              <Button
                type="submit"
                variant="outline"
                disabled={saving || !passwordChanged}
              >
                <KeyRound className="size-4" />
                {saving ? "Updating..." : "Change Password"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}