import { create } from "zustand";
import { UserRole, Permission } from "@domain/entities/User";

export type { UserRole };

export interface AuthUser {
  id: string;
  name: string;
  email?: string;
  role: UserRole;
  permissions: Permission[];
}

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: AuthUser) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  hasRole: (role: UserRole | UserRole[]) => boolean;
  hasPermission: (permission: string) => boolean;
}

const GUEST_USER: AuthUser = {
  id: "guest-001",
  name: "Guest Pilot",
  role: "guest",
  permissions: ["tools:read", "calculator:use"],
};

export const useAuthStore = create<AuthState>((set, get) => ({
  user: GUEST_USER,
  isAuthenticated: false,
  isLoading: false,

  login: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: GUEST_USER, isAuthenticated: false }),
  setLoading: (isLoading) => set({ isLoading }),

  hasRole: (role) => {
    const { user } = get();
    if (!user) return false;
    const roles = Array.isArray(role) ? role : [role];
    return roles.includes(user.role);
  },

  hasPermission: (permission) => {
    const { user } = get();
    if (!user) return false;
    return user.permissions.includes(permission as Permission);
  },
}));
