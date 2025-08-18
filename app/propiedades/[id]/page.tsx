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
import { PropertyStructuredData } from "@/components/seo/property-structured-data";
import { Breadcrumbs, generatePropertyBreadcrumbs } from "@/components/seo/breadcrumbs"; 

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
  const propiedad = await getPropiedadPorId(Number(params.id));
  
  if (!propiedad) {
    return {
      title: "Propiedad no encontrada",
      description: "La propiedad que buscas no existe o ha sido removida.",
      robots: { index: false, follow: false }
    };
  }

  // Generar descripción optimizada para SEO
  const metaDescription = propiedad.description.length > 155 
    ? `${propiedad.description.substring(0, 152)}...`
    : propiedad.description;

  // Extraer palabras clave del título
  const titleKeywords = propiedad.title
    .toLowerCase()
    .split(/[\s,.-]+/)
    .filter(word => word.length > 2)
    .slice(0, 10); // Primeras 10 palabras relevantes

  // Keywords específicas para la propiedad
  const propertyKeywords = [
    ...titleKeywords,
    'propiedad en venta',
    'bienes raíces',
    'inmobiliaria Argentina',
    propiedad.estaVendida ? 'vendida' : 'disponible',
    'BAF Bienes Raíces'
  ];

  // Imágenes para OpenGraph
  const images = propiedad.imagenes.map((img, index) => ({
    url: img,
    width: 1200,
    height: 630,
    alt: `${propiedad.title} - Imagen ${index + 1}`,
    type: 'image/jpeg',
  }));

  const propertyUrl = `${process.env.NEXT_PUBLIC_APP_URL}/propiedades/${propiedad.id}`;

  return {
    title: `${propiedad.title} | BAF Bienes Raíces`,
    description: metaDescription,
    
    keywords: Array.from(new Set(propertyKeywords)), // Eliminar duplicados
    
    authors: [{ 
      name: "BAF Bienes Raíces", 
      url: process.env.NEXT_PUBLIC_APP_URL 
    }],
    
    publisher: "BAF Bienes Raíces",
    category: "Real Estate",
    
    openGraph: {
      type: 'article',
      locale: 'es_AR',
      url: propertyUrl,
      title: propiedad.title,
      description: metaDescription,
      siteName: 'BAF Bienes Raíces',
      images: images,
      publishedTime: propiedad.createdAt,
      modifiedTime: propiedad.updatedAt,
      section: 'Propiedades',
      tags: propertyKeywords,
    },

    twitter: {
      card: 'summary_large_image',
      title: propiedad.title,
      description: metaDescription.substring(0, 200), // Twitter limit
      images: images.length > 0 ? [images[0].url] : undefined,
      creator: '@liambialy',
      site: '@liambialy',
    },

    alternates: {
      canonical: propertyUrl,
    },

    robots: {
      index: !propiedad.estaVendida, // No indexar propiedades vendidas
      follow: true,
      googleBot: {
        index: !propiedad.estaVendida,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    other: {
      'article:author': 'BAF Bienes Raíces',
      'article:publisher': 'BAF Bienes Raíces',
      'og:updated_time': propiedad.updatedAt,
      'property:availability': propiedad.estaVendida ? 'sold' : 'available',
    }
  };
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

  const breadcrumbs = generatePropertyBreadcrumbs(propiedad.title, propiedad.id);

  return (
    <>
      {/* SEO: Schema.org structured data */}
      <PropertyStructuredData propiedad={propiedad} />
      
      <NavMobile />
      <Navbar propiedades={propiedades}/>
      
      <article className="container max-w-6xl py-6 lg:py-12 text-justify" itemScope itemType="https://schema.org/RealEstateListing">
        {/* SEO: Breadcrumbs */}
        <Breadcrumbs items={breadcrumbs} />
        
        <div className="space-y-4 flex flex-col items-center">
          {propiedad.estaVendida ? <Badge variant={"destructive"}>Vendido</Badge> : undefined}
          <h1 
            className="inline-block font-heading text-md lg:text-5xl capitalize"
            itemProp="name"
          >
            {propiedad.title}
          </h1>
          <p 
            className="text-sm text-muted-foreground"
            itemProp="description"
          >
            {propiedad.description}
          </p>
          
          {/* Meta información oculta para SEO */}
          <meta itemProp="url" content={`${process.env.NEXT_PUBLIC_APP_URL}/propiedades/${propiedad.id}`} />
          <meta itemProp="datePublished" content={propiedad.createdAt} />
          <meta itemProp="dateModified" content={propiedad.updatedAt} />
        </div>
        
        <hr className="my-4" />
        
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" itemProp="image">
          {imagenes}
        </div>
        
        <hr className="my-4" />                
        
        <div className="flex justify-center my-4">
          <a 
            href={propiedad.linkFacebook} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            itemProp="sameAs"
          >
            <Icons.facebook className="mr-2" /> Ver en Facebook
          </a>
        </div>
      </article>
    </>
  );
}
