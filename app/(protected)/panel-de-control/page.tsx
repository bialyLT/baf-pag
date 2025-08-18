import { getCurrentUser } from "@/lib/session";
import { getAllPropiedades } from "@/lib/propiedades";
import { DashboardPage } from "@/components/dashboard";
import { dashboardMetadata } from "@/config/dashboard";
import { Propiedad } from "@/types";

export const metadata = dashboardMetadata;

export default async function DashboardPageRoute() {
  const user = await getCurrentUser();
  const propiedades = await getAllPropiedades();

  return (
    <DashboardPage 
      userName={user?.name || "Usuario"} 
      propiedades={propiedades as unknown as Propiedad[]} 
    />
  );
}
