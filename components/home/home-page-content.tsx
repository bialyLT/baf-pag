import { Suspense } from "react";
import HeroLanding from "@/components/sections/hero-landing";
import { PropiedadesCarousel } from "@/components/sections/propiedades-carousel";
import { CarouselSkeleton } from "@/components/ui/loading-skeletons";
import { Propiedad } from "@/types";

interface HomePageContentProps {
  propiedades: Propiedad[];
}

export function HomePageContent({ propiedades }: HomePageContentProps) {
  return (
    <>
      <HeroLanding />
      <Suspense fallback={<CarouselSkeleton />}>
        <PropiedadesCarousel limit={9} />
      </Suspense>
    </>
  );
}
