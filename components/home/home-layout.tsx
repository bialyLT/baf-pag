import { ReactNode } from "react";
import { SiteFooter } from "@/components/layout/site-footer";
import { NavMobile } from "@/components/layout/mobile-nav";
import { Navbar } from "@/components/layout/navbar";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import { Propiedad } from "@prisma/client";

interface HomeLayoutProps {
  children: ReactNode;
  propiedades: Propiedad[];
}

export function HomeLayout({ children, propiedades }: HomeLayoutProps) {
  return (
    <>
      <NavMobile />
      <Navbar scroll={true} propiedades={propiedades} />
      <MaxWidthWrapper>
        <main className="flex-1">
          {children}
        </main>
      </MaxWidthWrapper>
      <SiteFooter />
    </>
  );
}
