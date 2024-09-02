import { UserRole } from "@prisma/client";

import { SidebarNavItem } from "types";

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
      { href: "/", icon: "home", title: "Página de Inicio", authorizeOnly: UserRole.ADMIN, },
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
