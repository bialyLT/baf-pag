export const revalidate = 10;

import { notFound } from "next/navigation";

import "@/styles/mdx.css";

import { Metadata } from "next";

import { constructMetadata } from "@/lib/utils";
import { getAllPropiedades, getAllPropiedadesId, getPropiedadPorId } from "@/lib/propiedades";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/layout/navbar";
import { NavMobile } from "@/components/layout/mobile-nav";
import PropiedadVistaModal from "@/components/modals/propiedad-vista-modal";
import { Icons } from "@/components/shared/icons"; 

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
      <NavMobile />
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
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {imagenes}
        </div>
        <hr className="my-4" />                
        <div className="flex justify-center my-4">
          <a href={propiedad.linkFacebook} target="_blank" rel="noopener noreferrer" className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            <Icons.facebook className="mr-2" /> Ver en Facebook
          </a>
        </div>

      </article>
    </>
  );
}
