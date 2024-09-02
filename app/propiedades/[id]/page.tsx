import { notFound } from "next/navigation";

import { Mdx } from "@/components/content/mdx-components";

import "@/styles/mdx.css";

import { Metadata } from "next";

import { constructMetadata, getBlurDataURL } from "@/lib/utils";
import { getAllPropiedades, getAllPropiedadesId, getPropiedadPorId } from "@/lib/propiedades";

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
  const page = await getPropiedadPorId(Number(params.id));

  if (!page) {
    notFound();
  }

  const images = await Promise.all(
    page.imagenes.map(async (src: string) => ({
      alt: src,
      src,
      blurDataURL: await getBlurDataURL(src),
    })),
  );

  return (
    <article className="container max-w-3xl py-6 lg:py-12">
      <div className="space-y-4">
        <h1 className="inline-block font-heading text-4xl lg:text-5xl">
          {page.title}
        </h1>
        <p className="text-xl text-muted-foreground">{page.description}</p>
      </div>
      <hr className="my-4" />
    </article>
  );
}
