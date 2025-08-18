import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/shared/icons";

interface AuthNavigationProps {
  type: "login" | "register";
}

export function AuthNavigation({ type }: AuthNavigationProps) {
  if (type === "login") {
    return (
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "outline", size: "sm" }),
          "absolute left-4 top-4 md:left-8 md:top-8",
        )}
      >
        <>
          <Icons.chevronLeft className="mr-2 size-4" />
          Volver al inicio
        </>
      </Link>
    );
  }

  return (
    <Link
      href="/login"
      className={cn(
        buttonVariants({ variant: "ghost" }),
        "absolute right-4 top-4 md:right-8 md:top-8"
      )}
    >
      Iniciar sesión
    </Link>
  );
}
