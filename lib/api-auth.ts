import { auth } from "@/auth";

/**
 * Helper central de autorización para rutas API mutantes.
 * Todas las rutas que escriban, borren o suban datos deben usar requireAdmin()
 * al inicio, antes de cualquier operación.
 */
export async function requireAdmin() {
  const session = await auth();

  if (!session?.user) {
    return { authorized: false as const, status: 401 as const };
  }

  if (session.user.role !== "ADMIN") {
    return { authorized: false as const, status: 403 as const };
  }

  return { authorized: true as const, user: session.user };
}
