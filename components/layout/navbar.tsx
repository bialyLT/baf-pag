"use client"
 
import { ComponentPropsWithoutRef, ElementRef, forwardRef, useContext } from "react";
import Link from "next/link"
 
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Icons } from "../shared/icons"
import MaxWidthWrapper from "../shared/max-width-wrapper"
import { useScroll } from "@/hooks/use-scroll"
import { useSelectedLayoutSegment } from "next/navigation"
import { siteConfig } from "@/config/site"
import { useSession } from "next-auth/react"
import { Button } from "../ui/button"
import { ModalContext } from "../modals/providers"
import { Skeleton } from "../ui/skeleton";
import { ModeToggle } from "./mode-toggle";
import { UserAccountNav } from "./user-account-nav";

interface NavbarProps {
  scroll?: boolean;
  large?: boolean;
  propiedades;
}

export function Navbar({ scroll = false, propiedades }: NavbarProps) {
  const scrolled = useScroll(50);
  const selectedLayout = useSelectedLayoutSegment();
  const documentation = selectedLayout === "docs";
  const { data: session, status } = useSession();
  const { setShowSignInModal } = useContext(ModalContext);

  return (
    <header
    className={`sticky top-0 z-40 flex w-full justify-center bg-background/60 backdrop-blur-xl transition-all ${
      scroll ? (scrolled ? "border-b" : "bg-transparent") : "border-b"
    }`}
  >
    <MaxWidthWrapper
      className="hidden md:flex h-14 items-center justify-between py-4 max-w-full"
      large={documentation}
    >
      {/* logo */}
      <Link href="/" className="flex items-center space-x-1.5">
      <Icons.logo />
        <span className="font-urban text-xl font-bold">
          {siteConfig.name}
        </span>
      </Link>
      <NavigationMenu>
      <NavigationMenuList>
        {/* inicio */}
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Inicio
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        {/* dropdown propiedades */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Propiedades</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[200px] lg:w-[200px] max-h-80 overflow-y-auto">
              {
                propiedades != undefined ? 
                  propiedades.map((p, i) => { return (
                  <ListItem href={`/propiedades/${p.id}`} title={p.title} key={i} ></ListItem>
                )})
                :
                <ListItem href="/" title="No se encontró ninguna propiedad" ></ListItem>
              }
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        {/* contacto */}
        <NavigationMenuItem>
          <Link href="/contacto" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Contacto
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

      </NavigationMenuList>
      </NavigationMenu>
      {/* boton para iniciar sesion y entrar al panel de admin */}
      {session ?   
      <UserAccountNav />
      :
        status === "unauthenticated" ? (
            <Button
              className="hidden gap-2 px-5 md:flex"
              variant="default"
              size="sm"
              rounded="full"
              onClick={() => setShowSignInModal(true)}
            >
              <span>Iniciar Sesión</span>
              <Icons.arrowRight className="size-4" />
            </Button>
          ) : (
            <Skeleton className="hidden h-9 w-28 rounded-full lg:flex" />
      )}
      {/* boton para cambiar el tema de la pagina */}
      <ModeToggle />
    </MaxWidthWrapper>
  </header>
  )
}
 
const ListItem = forwardRef<
  ElementRef<"a">,
  ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"