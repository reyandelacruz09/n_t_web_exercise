import { useEffect, useState, type ReactNode } from "react";

import { AuthContext, type AuthContextValue } from "./auth";
import { getMe, logoutUser, type User } from "@/services/auth";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;

    getMe()
      .then((current) => {
        if (active) setUser(current);
      })
      .catch(() => {
        if (active) setUser(null);
      })
      .finally(() => {
        if (active) setReady(true);
      });

    return () => {
      active = false;
    };
  }, []);

  function login(current: User) {
    setUser(current);
  }

  function updateUser(current: User) {
    setUser(current);
  }

  async function logout() {
    try {
      await logoutUser();
    } finally {
      setUser(null);
    }
  }

  const value: AuthContextValue = {
    user,
    isAuthenticated: !!user,
    ready,
    login,
    updateUser,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
