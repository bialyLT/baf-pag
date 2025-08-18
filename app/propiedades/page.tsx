"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { NavMobile } from "@/components/layout/mobile-nav"
import { Navbar } from "@/components/layout/navbar"
import { SiteFooter } from "@/components/layout/site-footer"
import { PropertyListStructuredData } from "@/components/seo/property-structured-data"
import { Breadcrumbs, generatePageBreadcrumbs } from "@/components/seo/breadcrumbs"
import { CldImage } from 'next-cloudinary'
import { Icons } from "@/components/shared/icons"
import { truncate } from "@/lib/utils"
import { useEffect, useState } from "react"
import { Propiedad } from "@/types"

export default function PropiedadesPage() {
  const [propiedades, setPropiedades] = useState<Propiedad[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPropiedades() {
      try {
        const response = await fetch('/api/propiedades')
        if (!response.ok) {
          throw new Error('Error al cargar propiedades')
        }
        const data = await response.json()
        setPropiedades(data)
      } catch (error) {
        console.error('Error fetching propiedades:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchPropiedades()
  }, [])

  // Configurar SEO para el lado cliente
  useEffect(() => {
    document.title = "Propiedades en Venta" // Remover duplicación de BAF
    
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Descubre todas nuestras propiedades disponibles. Casas, departamentos y terrenos en las mejores ubicaciones.')
    }
  }, [])

  if (loading) {
    return (
      <>
        <NavMobile />
        <Navbar propiedades={[]} />
        <div className="container max-w-7xl py-6 lg:py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4">Cargando propiedades...</p>
          </div>
        </div>
      </>
    )
  }

  // Breadcrumbs estáticos (sin incluir Inicio ya que se agrega automáticamente)
  const breadcrumbs = [
    { label: "Propiedades", href: "/propiedades" }
  ]

  // Separar propiedades disponibles y vendidas
  const disponibles = propiedades.filter(p => !p.estaVendida)
  const vendidas = propiedades.filter(p => p.estaVendida)

  return (
    <>
      {/* SEO: Schema.org structured data */}
      <PropertyListStructuredData propiedades={propiedades} />
      
      <NavMobile />
      <Navbar propiedades={propiedades} />
      
      <main className="container max-w-7xl py-6 lg:py-12">
        {/* SEO: Breadcrumbs */}
        <Breadcrumbs items={breadcrumbs} />
        
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-3xl md:text-5xl font-heading">
            Propiedades en Venta
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Descubre nuestro catálogo completo de propiedades. Desde acogedoras casas familiares hasta modernos departamentos, 
            tenemos la propiedad perfecta para ti.
          </p>
          <div className="flex justify-center gap-4 text-sm">
            <span className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              {disponibles.length} Disponibles
            </span>
            <span className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              {vendidas.length} Vendidas
            </span>
          </div>
        </div>

        {/* Propiedades Disponibles */}
        {disponibles.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-heading mb-8 text-green-700 dark:text-green-400">
              Propiedades Disponibles ({disponibles.length})
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {disponibles.map((propiedad) => (
                <PropertyCard key={propiedad.id} propiedad={propiedad} />
              ))}
            </div>
          </section>
        )}

        {/* Propiedades Vendidas */}
        {vendidas.length > 0 && (
          <section>
            <h2 className="text-2xl font-heading mb-8 text-red-700 dark:text-red-400">
              Propiedades Vendidas ({vendidas.length})
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {vendidas.map((propiedad) => (
                <PropertyCard key={propiedad.id} propiedad={propiedad} />
              ))}
            </div>
          </section>
        )}

        {/* Si no hay propiedades */}
        {propiedades.length === 0 && (
          <div className="text-center py-16">
            <Icons.home className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-heading mb-2">No hay propiedades disponibles</h2>
            <p className="text-muted-foreground">
              Pronto estaremos agregando nuevas propiedades. ¡Vuelve a visitarnos!
            </p>
          </div>
        )}
      </main>
      <SiteFooter />
    </>
  )
}

// Componente de tarjeta de propiedad
function PropertyCard({ propiedad }: { propiedad: any }) {
  const firstImage = propiedad.imagenes?.[0]

  return (
    <article 
      className="group border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-card"
      itemScope 
      itemType="https://schema.org/RealEstateListing"
    >
      <Link href={`/propiedades/${propiedad.id}`}>
        <div className="relative aspect-[4/3] overflow-hidden">
          {firstImage ? (
            <CldImage
              src={firstImage}
              alt={`Imagen principal de ${propiedad.title}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              itemProp="image"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <Icons.home className="w-12 h-12 text-muted-foreground" />
            </div>
          )}
          
          {/* Badge de estado */}
          <div className="absolute top-3 right-3">
            {propiedad.estaVendida ? (
              <Badge variant="destructive">Vendida</Badge>
            ) : (
              <Badge className="bg-green-600 hover:bg-green-700">Disponible</Badge>
            )}
          </div>
        </div>
      </Link>

      <div className="p-6">
        <Link href={`/propiedades/${propiedad.id}`}>
          <h3 
            className="font-semibold text-lg mb-3 line-clamp-2 group-hover:text-primary transition-colors"
            itemProp="name"
          >
            {propiedad.title}
          </h3>
        </Link>
        
        <p 
          className="text-sm text-muted-foreground mb-4 line-clamp-3"
          itemProp="description"
        >
          {truncate(propiedad.description, 150)}
        </p>

        <div className="flex items-center justify-between">
          <Link 
            href={`/propiedades/${propiedad.id}`}
            className="text-sm font-medium text-primary hover:underline"
          >
            Ver detalles
          </Link>
          
          <a 
            href={propiedad.linkFacebook}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
            title="Ver en Facebook"
            itemProp="sameAs"
          >
            <Icons.facebook className="w-4 h-4" />
            Facebook
          </a>
        </div>

        {/* Meta información para SEO */}
        <meta itemProp="url" content={`${process.env.NEXT_PUBLIC_APP_URL}/propiedades/${propiedad.id}`} />
        <meta itemProp="datePublished" content={propiedad.createdAt} />
        <meta itemProp="dateModified" content={propiedad.updatedAt} />
      </div>
    </article>
  )
}
