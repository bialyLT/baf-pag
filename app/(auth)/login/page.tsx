import { Suspense } from "react";
import { Metadata } from "next";

import { UserAuthForm } from "@/components/forms/user-auth-form";
import { 
  AuthContainer, 
  AuthHeader, 
  AuthNavigation, 
  AuthFooter 
} from "@/components/auth";

export const metadata: Metadata = {
  title: "Iniciar sesión",
  description: "Inicia sesión con tu cuenta de Google",
};

export default function LoginPage() {
  return (
    <>
      <AuthNavigation type="login" />
      <AuthContainer variant="simple">
        <AuthHeader 
          title="Bienvenido de vuelta"
          description="Inicia sesión con tu cuenta de Google para continuar"
        />
        <Suspense>
          <UserAuthForm />
        </Suspense>
        <AuthFooter type="login" />
      </AuthContainer>
    </>
  );
}
    