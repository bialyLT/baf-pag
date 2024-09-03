import { env } from "@/env.mjs";
import { cn, getBlurDataURL } from "@/lib/utils";
import { headerImage } from "@/config/header";
import BlurImage from "../shared/blur-image";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { Icons } from "../shared/icons";
import { siteConfig } from "@/config/site";
import MaxWidthWrapper from "../shared/max-width-wrapper";

export default async function HeroLanding() {
  const image = headerImage;
  return (
    <section className="hero min-h-screen bg-base">
          <div className='hero-content mt-5 flex justify-center gap-5 items-center flex-col md:flex-row-reverse'>
              <div>
                <BlurImage
                  src={image.imgInfo.url}
                  alt={image.imgInfo.alt}
                  width={300}
                  height={32}
                  priority
                  placeholder="blur"
                  blurDataURL={await getBlurDataURL(image.imgInfo.url!)}
                  className="min-w-fit rounded-lg shadow-2xl hidden lg:block"
                />
              </div>
              <div>
                <h1 className="text-balance font-urban text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-[66px]">
                  Bienvenido a BAF Bienes Raices!
                </h1>
                <p
                  className="max-w-2xl text-balance leading-normal text-muted-foreground sm:text-xl sm:leading-8 mb-10"
                  >
                  Descubra el hogar de sus sueños con nosotros. Nuestra pasión es encontrar la propiedad perfecta que se adapte a sus necesidades y estilo de vida.
                </p>
                  <Link
                    href="#propiedades"
                    prefetch={true}
                    className={cn(
                      buttonVariants({ size: "lg", rounded: "full" }),
                      "gap-2",
                    )}
                  >
                    <span>Ver Propiedades</span>
                    <Icons.arrowRight className="size-4" />
                  </Link>
                  <Link
                    href={siteConfig.links.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className={cn(
                      buttonVariants({
                        variant: "link",
                        size: "lg",
                        rounded: "full",
                      }),
                      "px-5",
                    )}
                  >
                    <Icons.facebook className="mr-2 size-4" />
                    <p>
                      Pagina de Facebook
                    </p>
                  </Link>
              </div>
          </div>
    </section>
  );
}
