import { MetadataRoute } from 'next'
import { getAllPropiedades } from '@/lib/propiedades'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://bafbienesraices.com.ar'
  
  try {
    // Obtener todas las propiedades para generar URLs dinámicas
    const propiedades = await getAllPropiedades()
    
    // URLs de propiedades dinámicas
    const propiedadUrls: MetadataRoute.Sitemap = propiedades.map((propiedad) => ({
      url: `${baseUrl}/propiedades/${propiedad.id}`,
      lastModified: new Date(propiedad.updatedAt),
      changeFrequency: 'weekly',
      priority: 0.8,
    }))

    // URLs estáticas principales
    const staticUrls: MetadataRoute.Sitemap = [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1.0,
      },
      {
        url: `${baseUrl}/propiedades`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
      },
      {
        url: `${baseUrl}/contacto`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      }
    ]

    return [...staticUrls, ...propiedadUrls]
  } catch (error) {
    console.error('Error generando sitemap:', error)
    
    // Fallback: solo URLs estáticas si hay error
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1.0,
      },
      {
        url: `${baseUrl}/contacto`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      }
    ]
  }
}
