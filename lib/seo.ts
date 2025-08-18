import { Metadata } from "next";
import { siteConfig } from "@/config/site";

// Configuración SEO centralizada
export const seoConfig = {
  // Palabras clave principales por categoría
  keywords: {
    primary: [
      "bienes raíces",
      "propiedades en venta", 
      "casas en venta",
      "departamentos en venta",
      "BAF Bienes Raíces"
    ],
    secondary: [
      "inmobiliaria",
      "real estate",
      "venta de propiedades",
      "alquiler",
      "inversión inmobiliaria"
    ],
    location: [
      "Argentina",
      "Buenos Aires",
      "CABA",
      "propiedades Argentina"
    ]
  },
  
  // Schema.org estructurado por tipo
  businessSchema: {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": siteConfig.name,
    "url": siteConfig.url,
    "logo": `${siteConfig.url}/icon-baf.svg`,
    "image": `${siteConfig.url}/og-image.jpg`,
    "description": siteConfig.description,
    "email": siteConfig.mailSupport,
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "AR",
      "addressRegion": "Buenos Aires"
    },
    "sameAs": [
      siteConfig.links.facebook,
      siteConfig.links.linkedin,
      siteConfig.links.twitter
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+54-11-XXXX-XXXX", // Reemplazar con número real
      "contactType": "Customer Service",
      "availableLanguage": ["Spanish", "English"]
    },
    "priceRange": "$$",
    "openingHours": ["Mo-Fr 09:00-18:00"],
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": -34.6118, // Buenos Aires
        "longitude": -58.3960
      },
      "geoRadius": "50000" // 50km radius
    }
  }
};

// Función para generar metadatos optimizados para páginas específicas
interface SEOPageConfig {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  type?: 'website' | 'article' | 'product';
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  noIndex?: boolean;
}

export function generateSEOMetadata({
  title,
  description,
  keywords = [],
  image,
  type = 'website',
  publishedTime,
  modifiedTime,
  section,
  tags = [],
  noIndex = false
}: SEOPageConfig): Metadata {
  const fullTitle = title === siteConfig.name ? title : `${title} | ${siteConfig.name}`;
  const ogImage = image || `${siteConfig.url}/og-image.jpg`;
  
  // Combinar keywords específicas con las generales
  const allKeywords = [
    ...keywords,
    ...seoConfig.keywords.primary,
    ...seoConfig.keywords.secondary,
    ...tags
  ];

  const metadata: Metadata = {
    title: fullTitle,
    description: description.length > 160 ? `${description.substring(0, 157)}...` : description,
    keywords: Array.from(new Set(allKeywords)), // Eliminar duplicados
    
    authors: [
      {
        name: siteConfig.name,
        url: siteConfig.url,
      }
    ],
    
    publisher: siteConfig.name,
    category: section || "Real Estate",
    
    openGraph: {
      type: type === 'article' ? 'article' : 'website',
      locale: "es_AR",
      url: siteConfig.url,
      title: fullTitle,
      description,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
          type: "image/jpeg",
        }
      ],
      ...(type === 'article' && publishedTime && {
        publishedTime,
        modifiedTime: modifiedTime || publishedTime,
        section,
        tags,
      })
    },

    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: description.substring(0, 200),
      images: [ogImage],
      creator: "@liambialy",
      site: "@liambialy",
    },

    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    alternates: {
      canonical: siteConfig.url,
    },
  };

  return metadata;
}

// Función para generar Schema.org específico para propiedades
export function generatePropertySchema(property: {
  id: number;
  title: string;
  description: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
  estaVendida: boolean;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "@id": `${siteConfig.url}/propiedades/${property.id}`,
    "name": property.title,
    "description": property.description,
    "url": `${siteConfig.url}/propiedades/${property.id}`,
    "image": property.images.map(img => ({
      "@type": "ImageObject",
      "url": img,
      "caption": property.title
    })),
    "datePosted": property.createdAt,
    "dateModified": property.updatedAt,
    
    "offers": {
      "@type": "Offer",
      "availability": property.estaVendida 
        ? "https://schema.org/OutOfStock" 
        : "https://schema.org/InStock",
      "seller": {
        "@type": "RealEstateAgent",
        "name": siteConfig.name,
        "url": siteConfig.url
      }
    },
    
    "provider": seoConfig.businessSchema,
    
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/propiedades/${property.id}`
    }
  };
}
