import { UserRole } from "@prisma/client";
import { SidebarNavItem } from "types";
import { generatePageMetadata } from "@/config/site";

export const sidebarLinks: SidebarNavItem[] = [
  {
    title: "MENÚ",
    items: [
      { href: "/panel-de-control", icon: "dashboard", title: "Panel de Control", authorizeOnly: UserRole.ADMIN },
      { href: "/panel-de-control/estadisticas", icon: "lineChart", title: "Estadísticas", authorizeOnly: UserRole.ADMIN }
    ],
  },
  {
    title: "OPCIONES",
    items: [
      { href: "/panel-de-control/configuraciones", icon: "settings", title: "Configuración", authorizeOnly: UserRole.ADMIN, },
      {
        href: "#",
        icon: "messages",
        title: "Soporte",
        authorizeOnly: UserRole.ADMIN,
        disabled: true,
      },
    ],
  },
];

// Dashboard metadata
export const dashboardMetadata = generatePageMetadata({
  title: "Panel de control",
  description: "Panel de control de BAF Bienes Raíces",
  keywords: ["panel", "admin", "dashboard"]
});

export const settingsMetadata = generatePageMetadata({
  title: "Configuraciones",
  description: "Administra tu cuenta y las configuraciones de la página",
  keywords: ["configuraciones", "settings", "cuenta"]
});

export const statsMetadata = generatePageMetadata({
  title: "Estadísticas",
  description: "Estadísticas del sistema de BAF Bienes Raíces",
  keywords: ["estadísticas", "métricas", "análisis"]
});
