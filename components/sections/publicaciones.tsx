import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeaderSection } from "@/components/shared/header-section";
import { Icons } from "@/components/shared/icons";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";

export default function Publicaciones({propiedades}) {

  return (
    <section>
      <div className="pb-6 pt-28">
        <MaxWidthWrapper>
          <HeaderSection
            label="Publicaciones"
            title="Descubre todas las propiedades con las que contamos."
            subtitle="Confía en nuestra experiencia y dedicación para ayudarte a encontrar la propiedad ideal."
          />

          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
             {propiedades.map((p) => {
              return (
                <div
                  className="group text-center relative overflow-hidden rounded-2xl border bg-background p-5 md:p-8"
                  key={p.title}
                >
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 aspect-video -translate-y-1/2 rounded-full border bg-gradient-to-b from-purple-500/80 to-white opacity-25 blur-2xl duration-300 group-hover:-translate-y-1/4 dark:from-white dark:to-white dark:opacity-5 dark:group-hover:opacity-10"
                  />
                  <div className="relative">
                    <p className="mt-6 pb-6 text-muted-foreground">
                      {p.title}
                    </p>
                    <div className="-mb-5 flex gap-3 border-t border-muted py-4 md:-mb-7">
                      <Button
                        variant="secondary"
                        size="sm"
                        rounded="xl"
                        className="px-4"
                      >
                        <Link href={`/propiedades/${p.id}`} className="flex items-center gap-2">
                          <span>Ver más</span>
                          <Icons.arrowUpRight className="size-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </MaxWidthWrapper>
      </div>
    </section>
  );
}
