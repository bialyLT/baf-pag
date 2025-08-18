import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/session";
import { shouldRedirect, getRedirectUrl } from "@/lib/auth-utils";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
  const user = await getCurrentUser();

  // Si el usuario está autenticado, redirigir según su rol
  if (shouldRedirect(user)) {
    redirect(getRedirectUrl(user));
  }

  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
}
