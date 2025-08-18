import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { sidebarLinks } from "@/config/dashboard";
import { UserRole } from "@prisma/client";

export interface DashboardUser {
  id: string;
  name: string | null;
  role: UserRole;
}

/**
 * Obtiene el usuario actual y valida que tenga permisos de admin
 */
export async function getDashboardUser(): Promise<DashboardUser> {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (user.role !== "ADMIN") {
    redirect("/");
  }

  return {
    id: user.id!,
    name: user.name || null,
    role: user.role
  };
}

/**
 * Filtra los enlaces del sidebar según el rol del usuario
 */
export function getFilteredSidebarLinks(userRole: UserRole) {
  return sidebarLinks.map((section) => ({
    ...section,
    items: section.items.filter(
      ({ authorizeOnly }) => !authorizeOnly || authorizeOnly === userRole,
    ),
  }));
}

/**
 * Utility para verificar si el usuario puede acceder a una ruta
 */
export function canAccessRoute(userRole: UserRole, requiredRole?: UserRole): boolean {
  if (!requiredRole) return true;
  return userRole === requiredRole;
}
