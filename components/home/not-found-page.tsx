import Image from "next/image";
import Link from "next/link";

interface NotFoundPageProps {
  title?: string;
  description?: string;
  imageSrc?: string;
  imageAlt?: string;
  linkText?: string;
  linkHref?: string;
}

export function NotFoundPage({
  title = "404",
  description = "Página no encontrada, vuelve a la página de inicio.",
  imageSrc = "/_static/illustrations/rocket-crashed.svg",
  imageAlt = "404",
  linkText = "página de inicio",
  linkHref = "/"
}: NotFoundPageProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-6xl font-bold mb-2">{title}</h1>
      
      <Image
        src={imageSrc}
        alt={imageAlt}
        width={400}
        height={400}
        className="pointer-events-none mb-5 mt-6 dark:invert"
      />
      
      <p className="text-balance px-4 text-center text-2xl font-medium">
        {description.split(linkText)[0]}
        <Link
          href={linkHref}
          className="text-muted-foreground underline underline-offset-4 hover:text-purple-500"
        >
          {linkText}
        </Link>
        {description.split(linkText)[1] || "."}
      </p>
    </div>
  );
}
