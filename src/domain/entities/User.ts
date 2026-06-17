export type UserRole = "pilot" | "instructor" | "admin" | "guest";

export type Permission =
  | "tools:read"
  | "calculator:use"
  | "tools:write"
  | "users:manage"
  | "admin:access";

export interface User {
  id: string;
  name: string;
  email?: string;
  role: UserRole;
  permissions: Permission[];
}
