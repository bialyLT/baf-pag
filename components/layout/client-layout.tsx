"use client"

import { NavMobile } from "@/components/layout/mobile-nav"
import { Navbar } from "@/components/layout/navbar"
import { Propiedad } from "@/types"

interface ClientLayoutProps {
  propiedades: Propiedad[]
  children: React.ReactNode
}

export function ClientLayout({ propiedades, children }: ClientLayoutProps) {
  return (
    <>
      <NavMobile />
      <Navbar propiedades={propiedades} />
      {children}
    </>
  )
}
