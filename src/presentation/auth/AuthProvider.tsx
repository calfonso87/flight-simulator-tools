import React from "react";
import { AuthContext } from "./AuthContext";
import { useAuthStore } from "@app/stores/authStore";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const store = useAuthStore();
  return <AuthContext.Provider value={store}>{children}</AuthContext.Provider>;
}
