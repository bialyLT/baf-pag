import { Suspense } from "react";

import { UserAuthForm } from "@/components/forms/user-auth-form";
import { 
  AuthContainer, 
  AuthHeader, 
  AuthNavigation, 
  AuthFooter 
} from "@/components/auth";

export const metadata = {
  title: "Crear una cuenta",
  description: "Crea una cuenta para empezar a administrar baf bienes raíces.",
}

export default function RegisterPage() {
  return (
    <>
      <AuthNavigation type="register" />
      <AuthContainer variant="split">
        <AuthHeader 
          title="Crear una cuenta"
          description="Ingresa con tu cuenta de Google"
        />
        <Suspense>
          <UserAuthForm type="register" />
        </Suspense>
        <AuthFooter type="register" />
      </AuthContainer>
    </>
  );
}
