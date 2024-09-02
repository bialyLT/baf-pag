import { SiteFooter } from "@/components/layout/site-footer";
import { NavMobile } from "@/components/layout/mobile-nav";
import { Navbar } from "@/components/layout/navbar";
import { getAllPropiedades } from "@/lib/propiedades";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default async function MarketingLayout({ children }: MarketingLayoutProps) {

  const propiedades = await getAllPropiedades();

  return (
    <div className="flex min-h-screen flex-col">
      <NavMobile propiedades={propiedades}/>
      <Navbar scroll={true} propiedades={propiedades} />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
