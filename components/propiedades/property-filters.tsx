"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"

interface PropertyFiltersProps {
  children: React.ReactNode
}

export function PropertyFilters({ children }: PropertyFiltersProps) {
  const [filter, setFilter] = useState<'todas' | 'disponibles' | 'vendidas'>('todas')

  return (
    <div className="space-y-6">
      {/* Filtros de disponibilidad */}
      <div className="flex flex-wrap gap-2 justify-center">
        <Badge
          variant={filter === 'todas' ? 'default' : 'outline'}
          className="cursor-pointer"
          onClick={() => setFilter('todas')}
        >
          Todas las propiedades
        </Badge>
        <Badge
          variant={filter === 'disponibles' ? 'default' : 'outline'}
          className="cursor-pointer"
          onClick={() => setFilter('disponibles')}
        >
          Disponibles
        </Badge>
        <Badge
          variant={filter === 'vendidas' ? 'default' : 'outline'}
          className="cursor-pointer"
          onClick={() => setFilter('vendidas')}
        >
          Vendidas
        </Badge>
      </div>

      {/* Contenido filtrado */}
      <div className="filtered-content" data-filter={filter}>
        {children}
      </div>
    </div>
  )
}
