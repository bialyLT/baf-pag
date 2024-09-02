import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/shared/icons"
import { UserAuthForm } from "@/components/forms/user-auth-form"
import { Suspense } from "react"
import { headerImage } from "@/config/header"
import Image from "next/image"

export const metadata = {
  title: "Crear una cuenta",
  description: "Crea una cuenta para empezar a administrar baf bienes raíces.",
}

export default function RegisterPage() {

  const image = headerImage;

  return (
    <div className="container grid h-screen w-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        href="/login"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute right-4 top-4 md:right-8 md:top-8"
        )}
      >
        Iniciar sesión
      </Link>
      <div className="hidden h-full text-center lg:justify-center lg:items-center bg-muted lg:flex">
        <p className="text-balance font-urban text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-[66px]">BAF Bienes Raíces</p>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <Icons.logo className="mx-auto size-20" />
            <h1 className="text-2xl font-semibold tracking-tight">
              Crear una cuenta
            </h1>
            <p className="text-sm text-muted-foreground">
              Ingresa con tu cuenta de Google
            </p>
          </div>
          <Suspense>
            <UserAuthForm type="register" />
          </Suspense>
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
        </div>
      </div>
    </div>
  )
}
