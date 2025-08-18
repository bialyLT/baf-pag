import { SiteConfig } from "types";
import { env } from "@/env.mjs";
import { Metadata } from "next";

const site_url = env.NEXT_PUBLIC_APP_URL;

export const siteConfig: SiteConfig = {
  name: "BAF Bienes Raices",
  description:
    "Descubra el hogar de sus sueños con nosotros. Nuestra pasión es encontrar la propiedad perfecta que se adapte a sus necesidades y estilo de vida.",
  url: site_url,
  links: {
    twitter: "https://x.com/liambialy",
    github: "https://github.com/bialyLT",
    facebook: "https://www.facebook.com/profile.php?id=100077386128848",
    linkedin: "https://www.linkedin.com/in/liambialy"
  },
  mailSupport: "bafbienesraices@gmail.com",
};

// Utility para generar metadatos
interface PageMetadata {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
}

export function generatePageMetadata({
  title,
  description,
  keywords = [],
  ogImage = "/og-image.jpg"
}: PageMetadata): Metadata {
  // Evitar duplicación si el título ya contiene "BAF"
  const fullTitle = title.toLowerCase().includes('baf') ? title : `${title} | ${siteConfig.name}`;

  return {
    title: fullTitle,
    description,
    keywords: [
      ...keywords,
      "bienes raíces",
      "propiedades",
      "inmobiliaria",
      "BAF"
    ],
    authors: [{ name: siteConfig.name }],
    openGraph: {
      title: fullTitle,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title
        }
      ],
      type: "website",
      siteName: siteConfig.name
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage]
    },
    robots: {
      index: true,
      follow: true
    }
  };
}

// Metadatos predefinidos
export const homeMetadata = generatePageMetadata({
  title: "BAF Bienes Raíces - Inmobiliaria en Posadas, Misiones",
  description: siteConfig.description,
  keywords: ["inicio", "propiedades en venta", "casas", "departamentos"]
});

export const errorMetadata = generatePageMetadata({
  title: "Error",
  description: `Ha ocurrido un error inesperado en ${siteConfig.name}.`,
  keywords: ["error"]
});

export const notFoundMetadata = generatePageMetadata({
  title: "Página no encontrada",
  description: `La página que buscas no existe en ${siteConfig.name}.`,
  keywords: ["404", "no encontrado"]
});
