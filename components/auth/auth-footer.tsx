import Link from "next/link";

interface AuthFooterProps {
  type: "login" | "register";
}

export function AuthFooter({ type }: AuthFooterProps) {
  if (type === "login") {
    return (
      <p className="px-8 text-center text-sm text-muted-foreground">
        <Link
          href="/register"
          className="hover:text-brand underline underline-offset-4"
        >
          ¿No tienes una cuenta? Regístrate y espera la validación.
        </Link>
      </p>
    );
  }

  return (
    <p className="px-8 text-center text-sm text-muted-foreground">
      Al tocar en continuar, aceptas los{" "}
      <Link
        href="/terms"
        className="hover:text-brand underline underline-offset-4"
      >
        Términos de servicio
      </Link>{" "}
      y nuestras{" "}
      <Link
        href="/privacy"
        className="hover:text-brand underline underline-offset-4"
      >
        Políticas de Privacidad
      </Link>
      .
    </p>
  );
}
