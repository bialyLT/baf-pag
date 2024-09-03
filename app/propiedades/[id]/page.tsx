import { notFound } from "next/navigation";

import "@/styles/mdx.css";

import { Metadata } from "next";

import { constructMetadata } from "@/lib/utils";
import { getAllPropiedades, getAllPropiedadesId, getPropiedadPorId } from "@/lib/propiedades";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/layout/navbar";
import { NavMobile } from "@/components/layout/mobile-nav";
import PropiedadVistaModal from "@/components/modals/propiedad-vista-modal";

export async function generateStaticParams() {
  const propiedades = await getAllPropiedadesId();

  return propiedades.map((p) => ({
    id: p.id.toString(),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata | undefined> {
  const page = await getPropiedadPorId(Number(params.id));
  if (!page) {
    return;
  }

  return constructMetadata({
    title: page.title,
    description: page.description,
  });
}

export default async function PagePage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const propiedad = await getPropiedadPorId(Number(params.id));
  const propiedades = await getAllPropiedades();

  if (!propiedad) {
    notFound();
  }

  const imagenes = propiedad.imagenes.map((img: string, i) => (
    <PropiedadVistaModal propiedad={propiedad} img={img} index={i} key={i} />
  ));


  return (
    <>
      <NavMobile propiedades={propiedades}/>
      <Navbar propiedades={propiedades}/>
      <article className="container max-w-6xl py-6 lg:py-12 text-justify">
        <div className="space-y-4 flex flex-col items-center">
          {propiedad.estaVendida ? <Badge variant={"destructive"}>Vendido</Badge> : undefined}
          <h1 className="inline-block font-heading text-md lg:text-5xl capitalize">
            {propiedad.title}
          </h1>
          <p className="text-sm text-muted-foreground">{propiedad.description}</p>
        </div>
        <hr className="my-4" />
        <div className="grid grid-cols-3 gap-5 justify-center justify-items-center items-center">
          {imagenes}
        </div>
      </article>
    </>
  );
}
