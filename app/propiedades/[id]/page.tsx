import { notFound } from "next/navigation";

import "@/styles/mdx.css";

import { Metadata } from "next";

import { constructMetadata, getBlurDataURL, normalizeTitle } from "@/lib/utils";
import { getAllPropiedadesId, getPropiedadPorId } from "@/lib/propiedades";
import Image from "next/image";

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

  if (!propiedad) {
    notFound();
  }

  const imagenes = propiedad.imagenes.map((img: string, i) => (
    <Image
    key={i}
    src={`/_static/images/propiedades/${normalizeTitle(propiedad.title)}/${img}`}
    alt={`${normalizeTitle(propiedad.title)}-${i}`}
    width={200}
    height={200}
    className="min-w-fit rounded-lg shadow-2xl md:block"
  />
  
  ));


  return (
    <article className="container max-w-3xl py-6 lg:py-12">
      <div className="space-y-4">
        <h1 className="inline-block font-heading text-4xl lg:text-5xl">
          {propiedad.title}
        </h1>
        <p className="text-xl text-muted-foreground">{propiedad.description}</p>
      </div>
      <hr className="my-4" />
      <div>
        {imagenes}
      </div>
    </article>
  );
}
