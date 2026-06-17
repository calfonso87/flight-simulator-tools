import React from "react";
import { UserRole, useAuthStore } from "@app/stores/authStore";

interface RoleGuardProps {
  roles: UserRole | UserRole[];
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

export function RoleGuard({ roles, fallback = null, children }: RoleGuardProps) {
  const { hasRole } = useAuthStore();
  return hasRole(roles) ? <>{children}</> : <>{fallback}</>;
}
