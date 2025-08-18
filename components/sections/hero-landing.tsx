import { env } from "@/env.mjs";
import { cn, getBlurDataURL } from "@/lib/utils";
import { headerImage } from "@/config/header";
import BlurImage from "../shared/blur-image";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { Icons } from "../shared/icons";
import { siteConfig } from "@/config/site";
import MaxWidthWrapper from "../shared/max-width-wrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Home, Users, Star, Award, CheckCircle } from "lucide-react";

const stats = [
  {
    icon: Home,
    number: "500+",
    label: "Propiedades vendidas",
  },
  {
    icon: Users,
    number: "1000+",
    label: "Clientes satisfechos",
  },
  {
    icon: Award,
    number: "5+",
    label: "Años de experiencia",
  },
  {
    icon: Star,
    number: "4.9★",
    label: "Calificación promedio",
  },
];

export default async function HeroLanding() {
  const image = headerImage;
  
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-primary/5 to-primary/10 pt-20 pb-16 lg:pt-28 lg:pb-24 min-h-[90vh] flex items-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-l from-primary/10 to-transparent rounded-full blur-2xl" />
      </div>

      <MaxWidthWrapper className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-10 items-center">
          
          {/* Content Column */}
          <div className="space-y-8 text-center lg:text-left">
            {/* Badge */}
            <div className="flex justify-center lg:justify-start">
              <Badge variant="outline" className="bg-primary/5 border-primary/20 px-4 py-2">
                <MapPin className="w-3 h-3 mr-2" />
                Posadas, Misiones
              </Badge>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold tracking-tight">
                Tu{" "}
                <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  hogar ideal
                </span>{" "}
                te espera
              </h1>
              
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Descubre propiedades únicas con BAF Bienes Raíces. Te acompañamos en cada paso para encontrar el hogar perfecto que se adapte a tu estilo de vida.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/propiedades" prefetch={true}>
                <Button size="lg" className="w-full sm:w-auto text-base font-medium px-8">
                  Ver Propiedades
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              
              <Link href="/contacto" prefetch={true}>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full sm:w-auto text-base font-medium px-8"
                >
                  Contactar ahora
                </Button>
              </Link>
            </div>

            {/* Social Proof */}
            <div>
              <Link
                href={siteConfig.links.facebook}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center flex-row lg:justify-start gap-4 pt-4 text-muted-foreground hover:text-primary transition-colors"
              >
                <Icons.facebook className="w-5 h-5" />
                <span className="text-sm text-muted-foreground transition-colors">
                  Síguenos en Facebook
                </span>
              </Link>
            </div>
          </div>

          {/* Image Column */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative max-w-md lg:max-w-lg">
              <BlurImage
                src={image.imgInfo.url}
                alt={image.imgInfo.alt}
                width={450}
                height={380}
                priority
                placeholder="blur"
                blurDataURL={await getBlurDataURL(image.imgInfo.url!)}
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
              
              {/* Floating Experience Badge */}
              <div className="absolute top-2 right-2 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-xl p-3 shadow-lg hidden lg:block">
                <div className="text-center">
                  <div className="text-xl font-bold">5+</div>
                  <div className="text-xs opacity-90">Años de<br />experiencia</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
