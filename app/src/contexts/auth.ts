import { createContext } from "react";

import type { User } from "@/services/auth";

export type AuthContextValue = {
  user: User | null;
  isAuthenticated: boolean;
  ready: boolean;
  login: (user: User) => void;
  updateUser: (user: User) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextValue | null>(null);
