"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { SidebarNavItem } from "@/types";
import { usePropiedades } from "@/components/dashboard/propiedades-context";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Icons } from "@/components/shared/icons";

interface SearchCommandProps {
  links: SidebarNavItem[];
}

export function SearchCommand({ links }: SearchCommandProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const router = useRouter();
  const propiedades = usePropiedades();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  // Filter propiedades based on search
  const filteredPropiedades = React.useMemo(() => {
    if (!search) return propiedades.slice(0, 8); // Show first 8 when no search
    
    const filtered = propiedades.filter((propiedad) =>
      propiedad.title.toLowerCase().includes(search.toLowerCase()) ||
      propiedad.description.toLowerCase().includes(search.toLowerCase())
    );
    
    return filtered.slice(0, 10); // Limit to 10 results max
  }, [search, propiedades]);

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          "relative h-9 w-full justify-start rounded-md bg-muted/50 text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-72",
        )}
        onClick={() => setOpen(true)}
      >
        <span className="inline-flex">
          Buscar propiedades...
        </span>
        <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.45rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">Ctrl</span>K
        </kbd>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput 
          placeholder="Buscar propiedades..." 
          value={search}
          onValueChange={setSearch}
        />
        <CommandList>
          <CommandEmpty>Ninguna propiedad encontrada.</CommandEmpty>
          
          {/* Propiedades Results */}
          <CommandGroup heading={`Propiedades (${propiedades.length})`}>
            {filteredPropiedades.map((propiedad) => (
              <CommandItem
                key={propiedad.id}
                onSelect={() => {
                  runCommand(() => router.push(`/propiedades/${propiedad.id}`));
                }}
              >
                <Icons.home className="mr-2 h-4 w-4 flex-shrink-0" />
                <div className="flex flex-col">
                  <span className="font-medium">{propiedad.title}</span>
                  <span className="text-sm text-muted-foreground truncate">
                    {propiedad.description.length > 50 
                      ? `${propiedad.description.substring(0, 50)}...` 
                      : propiedad.description}
                    {propiedad.estaVendida ? " • VENDIDA" : ""}
                  </span>
                </div>
              </CommandItem>
            ))}
            {propiedades.length > filteredPropiedades.length && (
              <CommandItem
                onSelect={() => {
                  runCommand(() => router.push("/panel-de-control"));
                }}
              >
                <Icons.search className="mr-2 h-4 w-4 flex-shrink-0" />
                <span className="text-muted-foreground">
                  Ver todas las propiedades ({propiedades.length})
                </span>
              </CommandItem>
            )}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
