import { Navigate } from "react-router-dom";

interface RoleGuardProps {
  allowedRole: "student" | "employer";
  children: React.ReactNode;
}

export function RoleGuard({ allowedRole, children }: RoleGuardProps) {
  // Берём роль из localStorage
  const storedRole = localStorage.getItem("userRole");
  const storedEmail = localStorage.getItem("userEmail");

  // Если нет роли или email — редирект на главную
  if (!storedRole || !storedEmail) {
    return <Navigate to="/" replace />;
  }

  // Если роль не совпадает — редирект на главную
  if (storedRole !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}