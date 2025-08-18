import { Icons } from "@/components/shared/icons";

interface AuthHeaderProps {
  title: string;
  description: string;
  showLogo?: boolean;
}

export function AuthHeader({ title, description, showLogo = true }: AuthHeaderProps) {
  return (
    <div className="flex flex-col space-y-2 text-center">
      {showLogo && <Icons.logo className="mx-auto size-20" />}
      <h1 className="text-2xl font-semibold tracking-tight">
        {title}
      </h1>
      <p className="text-sm text-muted-foreground">
        {description}
      </p>
    </div>
  );
}
