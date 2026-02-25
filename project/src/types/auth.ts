export type UserRole = "student" | "employer";

export interface User {
  id: number;
  name: string;
  role: UserRole;
}