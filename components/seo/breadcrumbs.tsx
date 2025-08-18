import { ChevronRight, Home } from "lucide-react"
import Link from "next/link"
import { siteConfig } from "@/config/site"

export interface BreadcrumbItem {
  label: string
  href: string
  current?: boolean
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  // Schema.org structured data para breadcrumbs
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": `${siteConfig.url}${item.href}`
    }))
  }

  return (
    <>
      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
      {/* Visual breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
        <div className="flex items-center space-x-2">
          <Home className="h-4 w-4" />
          <Link 
            href="/" 
            className="hover:text-foreground transition-colors"
          >
            Inicio
          </Link>
        </div>
        
        {items.filter(item => item.href !== '/').map((item, index) => (
          <div key={item.href} className="flex items-center space-x-2">
            <ChevronRight className="h-4 w-4" />
            {item.current ? (
              <span className="font-medium text-foreground" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link 
                href={item.href} 
                className="hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            )}
          </div>
        ))}
      </nav>
    </>
  )
}

// Función helper para generar breadcrumbs de propiedades
export function generatePropertyBreadcrumbs(propertyTitle?: string, propertyId?: number): BreadcrumbItem[] {
  const breadcrumbs: BreadcrumbItem[] = [
    {
      label: "Propiedades",
      href: "/propiedades"
    }
  ]

  if (propertyTitle && propertyId) {
    breadcrumbs.push({
      label: propertyTitle.length > 30 
        ? `${propertyTitle.substring(0, 30)}...` 
        : propertyTitle,
      href: `/propiedades/${propertyId}`,
      current: true
    })
  }

  return breadcrumbs
}

// Función helper para otras páginas
export function generatePageBreadcrumbs(pageTitle: string, href: string): BreadcrumbItem[] {
  return [
    {
      label: pageTitle,
      href,
      current: true
    }
  ]
}
