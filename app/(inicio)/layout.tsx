import { HomeLayout } from "@/components/home";
import { getAllPropiedades } from "@/lib/propiedades";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default async function MarketingLayout({ children }: MarketingLayoutProps) {
  const propiedades = await getAllPropiedades();

  return (
    <HomeLayout propiedades={propiedades}>
      {children}
    </HomeLayout>
  );
}
