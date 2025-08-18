import { DashboardLayout, getDashboardUser, getFilteredSidebarLinks, PropiedadesProvider } from "@/components/dashboard";
import { getAllPropiedades } from "@/lib/propiedades";
import { Navbar } from "@/components/layout/navbar";
import { Propiedad } from "@/types";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export default async function Dashboard({ children }: ProtectedLayoutProps) {
  const user = await getDashboardUser();
  const filteredLinks = getFilteredSidebarLinks(user.role);
  const propiedades = await getAllPropiedades();

  return (
    <PropiedadesProvider propiedades={propiedades as unknown as Propiedad[]}>
      <Navbar propiedades={propiedades as unknown as Propiedad[]} />
      <DashboardLayout links={filteredLinks}>
        {children}
      </DashboardLayout>
    </PropiedadesProvider>
  );
}
