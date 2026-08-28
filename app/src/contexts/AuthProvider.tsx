import { useState, type ReactNode } from "react";

import { AuthContext, type AuthContextValue } from "./auth";

function getStoredAuth(): { token: string | null; user: import("./auth").User | null } {
  try {
    const token = localStorage.getItem("token");
    const raw = localStorage.getItem("user");
    const user = raw ? JSON.parse(raw) : null;
    return { token, user };
  } catch {
    return { token: null, user: null };
  }
}

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [stored, setStored] = useState(getStoredAuth);

  function login(token: string, user: import("./auth").User) {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setStored({ token, user });
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setStored({ token: null, user: null });
  }

  const value: AuthContextValue = {
    token: stored.token,
    user: stored.user,
    isAuthenticated: !!stored.token,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
