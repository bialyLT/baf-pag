import { Suspense } from "react";
import HeroLanding from "@/components/sections/hero-landing";
import Publicaciones from "@/components/sections/publicaciones";
import { Propiedad } from "@prisma/client";

interface HomePageContentProps {
  propiedades: Propiedad[];
}

export function HomePageContent({ propiedades }: HomePageContentProps) {
  return (
    <>
      <HeroLanding />
      <Suspense fallback={<HomePageSkeleton />}>
        <Publicaciones propiedades={propiedades} />
      </Suspense>
    </>
  );
}

// Skeleton loader para las publicaciones
function HomePageSkeleton() {
  return (
    <section id="propiedades" className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <div className="h-8 bg-gray-200 rounded-md w-64 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded-md w-96 mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-gray-100 rounded-lg p-4 animate-pulse">
              <div className="h-48 bg-gray-200 rounded-md mb-4"></div>
              <div className="h-6 bg-gray-200 rounded-md mb-2"></div>
              <div className="h-4 bg-gray-200 rounded-md w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
