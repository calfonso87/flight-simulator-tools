import React from "react";
import { useAuthStore } from "@app/stores/authStore";

interface PermissionGuardProps {
  permission: string;
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

export function PermissionGuard({ permission, fallback = null, children }: PermissionGuardProps) {
  const { hasPermission } = useAuthStore();
  return hasPermission(permission) ? <>{children}</> : <>{fallback}</>;
}
