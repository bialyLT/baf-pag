import { SiteFooter } from "@/components/layout/site-footer";
import { NavMobile } from "@/components/layout/mobile-nav";
import { Navbar } from "@/components/layout/navbar";
import { getAllPropiedades } from "@/lib/propiedades";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default async function MarketingLayout({ children }: MarketingLayoutProps) {

  const propiedades = await getAllPropiedades();

  return (
    <>
    <NavMobile />
      <Navbar scroll={true} propiedades={propiedades} />
        <MaxWidthWrapper>
      <main className="flex-1">{children}</main>
        </MaxWidthWrapper>
      <SiteFooter />
    </>
  );
}
