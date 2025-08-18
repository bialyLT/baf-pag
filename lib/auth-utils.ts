import { UserRole } from "@prisma/client";

// Tipo extendido de usuario con role
interface AuthUser {
  id?: string;
  role?: UserRole;
}

/**
 * Determina la URL de redirección basada en el rol del usuario
 * @param user - Usuario autenticado
 * @returns URL de redirección
 */
export function getRedirectUrl(user: AuthUser): string {
  if (!user) return "/";
  
  // Si es admin, va al panel de control
  if (user.role === "ADMIN") {
    return "/panel-de-control";
  }
  
  // Usuarios normales van al inicio
  return "/";
}

/**
 * Verifica si el usuario debería ser redirigido
 * @param user - Usuario o null/undefined
 * @returns true si debe redirigir
 */
export function shouldRedirect(user: AuthUser | null | undefined): boolean {
  return !!user;
}
