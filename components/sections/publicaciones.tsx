import { Button } from "@/components/ui/button";
import { HeaderSection } from "@/components/shared/header-section";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import Image from "next/image";
import { normalizeTitle, truncate } from "@/lib/utils";
import { Badge } from "../ui/badge";

export default function Publicaciones({propiedades}) {
  const sortedPropiedades = propiedades.sort((a, b) => a.estaVendida - b.estaVendida);
  return (
    <section id="propiedades">
      <div className="pb-6">
        <MaxWidthWrapper>
          <HeaderSection
            label="Propiedades"
            title="Descubre todas las propiedades con las que contamos."
            subtitle="Confía en nuestra experiencia y dedicación para ayudarte a encontrar la propiedad ideal."
          />

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
             {sortedPropiedades.map((p, i) => {
              return (
                <>
                <div key={i} className="card bg-base-100 image-full w-90 shadow-xl">
                  <figure>
                    <Image
                      src={`/_static/images/propiedades/${normalizeTitle(p.title)}/${p.imagenes[0]}`}
                      alt={`image ${i} de la publicacion: ${p.title}`}
                      width={500}
                      height={500}
                      className="min-w-full hover:animate-customPing"
                      />
                  </figure>
                  <div className="card-body">
                    {p.estaVendida
                    ? 

                      <Badge variant="destructive">Vendido</Badge>
                    :
                    <Badge variant="success">Disponible</Badge>
                    }
                    <h2 className="card-title text-white capitalize">{truncate(p.title, 100)}</h2>
                    <p className="text-white">{truncate(p.description, 100)}</p>
                    <div className="card-actions justify-end">
                      <Button variant={"link"} className="hover:font-bold text-white">      
                        <a href={`/propiedades/${p.id}`}>
                        Ver más{'  >'}
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </>
              );
            })}
          </div>
        </MaxWidthWrapper>
      </div>
    </section>
  );
}