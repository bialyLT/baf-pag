import { Propiedad } from "@/types"
import { siteConfig } from "@/config/site"

interface PropertyStructuredDataProps {
  propiedad: Propiedad
}

export function PropertyStructuredData({ propiedad }: PropertyStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "@id": `${siteConfig.url}/propiedades/${propiedad.id}`,
    "name": propiedad.title,
    "description": propiedad.description,
    "url": `${siteConfig.url}/propiedades/${propiedad.id}`,
    "identifier": propiedad.id.toString(),
    
    // Imágenes
    "image": propiedad.imagenes.map((img, index) => ({
      "@type": "ImageObject",
      "url": img,
      "caption": `${propiedad.title} - Imagen ${index + 1}`,
      "name": propiedad.title,
    })),
    
    // Fechas
    "datePosted": propiedad.createdAt,
    "dateModified": propiedad.updatedAt,
    "datePublished": propiedad.createdAt,
    
    // Estado de disponibilidad
    "offers": {
      "@type": "Offer",
      "availability": propiedad.estaVendida 
        ? "https://schema.org/OutOfStock" 
        : "https://schema.org/InStock",
      "businessFunction": "http://purl.org/goodrelations/v1#Sell",
      "itemCondition": "https://schema.org/NewCondition",
      "priceCurrency": "ARS",
      "seller": {
        "@type": "RealEstateAgent",
        "name": siteConfig.name,
        "url": siteConfig.url,
        "telephone": "+54-3764-635099", // Reemplazar con número real
        "email": siteConfig.mailSupport,
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "AR",
          "addressRegion": "Buenos Aires"
        }
      }
    },
    
    // Proveedor/Agente inmobiliario
    "provider": {
      "@type": "RealEstateAgent", 
      "name": siteConfig.name,
      "url": siteConfig.url,
      "logo": `${siteConfig.url}/icon-baf.svg`,
      "email": siteConfig.mailSupport,
      "sameAs": [
        siteConfig.links.facebook,
        siteConfig.links.linkedin
      ]
    },
    
    // Página principal
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/propiedades/${propiedad.id}`,
      "name": propiedad.title,
      "description": propiedad.description,
      "url": `${siteConfig.url}/propiedades/${propiedad.id}`,
      "datePublished": propiedad.createdAt,
      "dateModified": propiedad.updatedAt,
      "author": {
        "@type": "Organization",
        "name": siteConfig.name,
        "url": siteConfig.url
      },
      "publisher": {
        "@type": "Organization", 
        "name": siteConfig.name,
        "url": siteConfig.url,
        "logo": {
          "@type": "ImageObject",
          "url": `${siteConfig.url}/icon-baf.svg`,
          "width": 60,
          "height": 60
        }
      }
    },
    
    // Enlaces adicionales
    "sameAs": [
      propiedad.linkFacebook
    ],
    
    // Palabras clave
    "keywords": [
      "propiedad en venta",
      "bienes raíces",
      "inmobiliaria",
      propiedad.estaVendida ? "vendida" : "disponible",
      ...propiedad.title.split(' ').filter(word => word.length > 3)
    ].join(', ')
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData, null, 2) }}
    />
  )
}

// Schema.org para la página de listado de propiedades
interface PropertyListStructuredDataProps {
  propiedades: Propiedad[]
}

export function PropertyListStructuredData({ propiedades }: PropertyListStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Propiedades en Venta - BAF Bienes Raíces",
    "description": "Lista completa de propiedades disponibles para la venta",
    "url": `${siteConfig.url}/propiedades`,
    "numberOfItems": propiedades.length,
    "itemListElement": propiedades.map((propiedad, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "RealEstateListing",
        "@id": `${siteConfig.url}/propiedades/${propiedad.id}`,
        "name": propiedad.title,
        "description": propiedad.description.substring(0, 160) + "...",
        "url": `${siteConfig.url}/propiedades/${propiedad.id}`,
        "image": propiedad.imagenes[0],
        "datePosted": propiedad.createdAt,
        "offers": {
          "@type": "Offer",
          "availability": propiedad.estaVendida 
            ? "https://schema.org/OutOfStock" 
            : "https://schema.org/InStock"
        }
      }
    }))
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData, null, 2) }}
    />
  )
}
