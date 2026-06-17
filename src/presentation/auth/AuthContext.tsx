import React, { createContext, useContext } from "react";
import { useAuthStore } from "@app/stores/authStore";

type AuthContextValue = ReturnType<typeof useAuthStore>;

const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuthContext(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be used within AuthProvider");
  return ctx;
}

export { AuthContext };
