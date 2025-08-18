import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/panel-de-control/',
          '/api/',
          '/_next/',
          '/admin/',
          '*.json',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: ['/api/og'], // Permitir OG images para Google
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
