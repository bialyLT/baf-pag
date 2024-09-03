import { User } from "@prisma/client";
import type { Icon } from "lucide-react";

import { Icons } from "@/components/shared/icons";

export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  mailSupport: string;
  links: {
    twitter: string;
    github: string;
    facebook: string;
    linkedin: string;
  };
};

export type NavItem = {
  title: string;
  href: string;
  badge?: number;
  disabled?: boolean;
  external?: boolean;
  authorizeOnly?: UserRole;
  icon?: keyof typeof Icons;
};

export type MainNavItem = NavItem;

export type MarketingConfig = {
  mainNav: MainNavItem[];
};

export type SidebarNavItem = {
  title: string;
  items: NavItem[];
  authorizeOnly?: UserRole;
  icon?: keyof typeof Icons;
};


// landing sections
export type InfoList = {
  icon: keyof typeof Icons;
  title: string;
  description: string;
};

interface Propiedad {
  id: string;
  title: string;
  description: string;
  linkFacebook: string;
  imagenes: string[];
  estaVendida: boolean;
}