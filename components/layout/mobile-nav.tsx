"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { LogOut, Menu, X } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

import { docsConfig } from "@/config/docs";
import { marketingConfig } from "@/config/marketing";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { DocsSidebarNav } from "@/components/docs/sidebar-nav";
import { Icons } from "@/components/shared/icons";

import { ModeToggle } from "./mode-toggle";
import { PropiedadesNavbar } from "@/types";

interface NavbarProps {
  propiedades: PropiedadesNavbar[];
}

export function NavMobile({ propiedades }) {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const selectedLayout = useSelectedLayoutSegment();
  const documentation = selectedLayout === "docs";

  const configMap = {
    docs: docsConfig.mainNav,
  };

  const links =
    (selectedLayout && configMap[selectedLayout]) || marketingConfig.mainNav;

  // prevent body scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "fixed right-2 top-2.5 z-50 rounded-full p-2 transition-colors duration-200 hover:bg-muted focus:outline-none active:bg-muted md:hidden",
          open && "hover:bg-muted active:bg-muted",
        )}
      >
        {open ? (
          <X className="size-5 text-muted-foreground" />
        ) : (
          <Menu className="size-5 text-muted-foreground" />
        )}
      </button>

      <nav
        className={cn(
          "fixed inset-0 z-20 hidden w-full overflow-auto bg-background px-5 py-16 lg:hidden",
          open && "block",
        )}
      >
        <ul className="grid divide-y divide-muted">
          {links && links.length > 0 && links.map(({ title, href }) => (
            <li key={href} className="p-2 hover:bg-muted rounded-lg text-foreground">
              <Link
                href={href}
                onClick={() => setOpen(false)}
                className="flex w-full text-sm"
              >
                {title}
              </Link>
            </li>
          ))}

          {session ? (
            <>
              {session.user.role === "ADMIN" ? (
                <>
                  <li className="rounded-lg text-foreground hover:bg-muted p-2">
                    <Link
                      href="/panel-de-control"
                      onClick={() => setOpen(false)}
                    >
                      <p className="text-sm">Panel de control</p>
                    </Link>
                  </li>
                </>
              ) : null}
                  <li
                    className="rounded-lg text-foreground hover:bg-muted p-2"
                    onClick={(event) => {
                      event.preventDefault();
                      signOut({
                        callbackUrl: `${window.location.origin}/`,
                      });
                    }}
                  >
                    <p className="text-sm pointer">Cerrar sesión</p>
                  </li>
            </>
          ) : (
            <>
              <li className="rounded-lg text-foreground hover:bg-muted p-2">
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                >
                  <p className="text-sm">Iniciar sesión</p>
                </Link>
              </li>

              <li className="rounded-lg text-foreground hover:bg-muted p-2">
                <Link
                  href="/register"
                  onClick={() => setOpen(false)}
                >
                  <p className="text-sm">Registrarse</p>
                </Link>
              </li>
            </>
          )}
        </ul>

        <div className="mt-5 flex items-center justify-end space-x-4">
          <Link href={siteConfig.links.github} target="_blank" rel="noreferrer">
            <Icons.gitHub className="size-6" />
            <span className="sr-only">GitHub</span>
          </Link>
          <ModeToggle />
        </div>
      </nav>
    </>
  );
}
