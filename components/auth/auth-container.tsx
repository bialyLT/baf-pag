import { ReactNode } from "react";

interface AuthContainerProps {
  children: ReactNode;
  variant?: "simple" | "split";
  sideContent?: ReactNode;
}

export function AuthContainer({ 
  children, 
  variant = "simple", 
  sideContent 
}: AuthContainerProps) {
  if (variant === "split") {
    return (
      <div className="container grid h-screen w-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
        {/* Contenido del lado izquierdo */}
        <div className="hidden h-full text-center lg:justify-center lg:items-center bg-muted lg:flex">
          {sideContent || (
            <p className="text-balance font-urban text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-[66px]">
              BAF Bienes Raíces
            </p>
          )}
        </div>
        
        {/* Contenido principal */}
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            {children}
          </div>
        </div>
      </div>
    );
  }

  // Layout simple (para login)
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        {children}
      </div>
    </div>
  );
}
