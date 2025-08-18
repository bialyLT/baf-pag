"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { CldImage } from 'next-cloudinary'
import { Icons } from "@/components/shared/icons"
import { truncate } from "@/lib/utils"
import { Propiedad } from "@/types"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { CarouselSkeleton } from "@/components/ui/loading-skeletons"

interface PropiedadesCarouselProps {
  limit?: number
  itemsPerView?: number
}

export function PropiedadesCarousel({ limit = 6, itemsPerView = 3 }: PropiedadesCarouselProps) {
  const [propiedades, setPropiedades] = useState<Propiedad[]>([])
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentItemsPerView, setCurrentItemsPerView] = useState(1)

  // Calcular el número máximo de slides basado en items por vista
  const maxSlides = Math.max(0, propiedades.length - currentItemsPerView + 1)

  // Efecto para manejar responsive
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width >= 1024) { // lg breakpoint
        setCurrentItemsPerView(3)
      } else if (width >= 768) { // md breakpoint  
        setCurrentItemsPerView(2)
      } else {
        setCurrentItemsPerView(1)
      }
      setCurrentIndex(0) // Reset al cambiar tamaño
    }

    handleResize() // Initial call
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    async function fetchPropiedades() {
      try {
        const response = await fetch('/api/propiedades')
        if (!response.ok) {
          throw new Error('Error al cargar propiedades')
        }
        const data = await response.json()
        // Solo mostrar propiedades disponibles y limitar la cantidad
        const disponibles = data.filter((p: Propiedad) => !p.estaVendida).slice(0, limit)
        setPropiedades(disponibles)
      } catch (error) {
        console.error('Error fetching propiedades:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchPropiedades()
  }, [limit])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex >= maxSlides - 1 ? 0 : prevIndex + 1
    )
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex <= 0 ? maxSlides - 1 : prevIndex - 1
    )
  }

  if (loading) {
    return <CarouselSkeleton />
  }

  if (propiedades.length === 0) {
    return (
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-heading mb-4">Propiedades Destacadas</h2>
            <p className="text-muted-foreground">Próximamente nuevas propiedades</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-heading mb-4">Propiedades Destacadas</h2>
          <p className="text-muted-foreground">Descubre nuestras mejores propiedades disponibles</p>
        </div>

        {/* Carrusel */}
        <div className="relative">
          {/* Botones de navegación */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-background/90 hover:bg-background border-border"
            onClick={prevSlide}
            disabled={propiedades.length <= currentItemsPerView}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-background/90 hover:bg-background border-border"
            onClick={nextSlide}
            disabled={propiedades.length <= currentItemsPerView}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* Contenedor del carrusel */}
          <div className="overflow-hidden mx-12">
            <div 
              className="flex transition-transform duration-300 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / currentItemsPerView)}%)`
              }}
            >
              {propiedades.map((propiedad) => (
                <div 
                  key={propiedad.id} 
                  className="flex-shrink-0 px-2"
                  style={{
                    width: `${100 / currentItemsPerView}%`
                  }}
                >
                  <PropertyCard propiedad={propiedad} />
                </div>
              ))}
            </div>
          </div>

          {/* Indicadores */}
          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: maxSlides }).map((_, index) => (
              <button
                key={index}
                title={`Ver grupo ${index + 1}`}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex 
                    ? 'bg-primary' 
                    : 'bg-muted-foreground/30'
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>

        {/* Enlace para ver todas las propiedades */}
        <div className="text-center mt-8">
          <Link 
            href="/propiedades"
            className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
          >
            Ver todas las propiedades
            <Icons.arrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

// Componente de tarjeta de propiedad reutilizado
function PropertyCard({ propiedad }: { propiedad: Propiedad }) {
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
            <Badge className="bg-green-600 hover:bg-green-700">Disponible</Badge>
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
          {truncate(propiedad.description, 120)}
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
      </div>
    </article>
  )
}
