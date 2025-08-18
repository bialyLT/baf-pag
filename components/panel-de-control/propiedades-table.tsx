"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "../ui/checkbox";
import { useState } from "react";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { PropiedadCrearModal } from "../modals/propiedad-crear-modal";
import { toast } from "sonner";
import { truncate } from "@/lib/utils";
import { CldImage } from 'next-cloudinary';
import { Icons } from "../shared/icons";
import { cn } from "@/lib/utils";
import { Propiedad } from "@/types";
import { MoreHorizontal, Eye, Edit, Trash2, RefreshCw } from "lucide-react";

interface PropiedadesTableProps {
  propiedades: Propiedad[];
}

export function PropiedadesTable({ propiedades }: PropiedadesTableProps) {
  const [loading, setLoading] = useState<string | null>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const handleToggleVendida = async (propiedad: Propiedad) => {
    const nuevaVentaEstado = !propiedad.estaVendida;
    setLoading(`toggle-${propiedad.id}`);

    try {
      const response = await fetch(
        `/api/propiedades/${propiedad.id}/esVendida`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ estaVendida: nuevaVentaEstado }),
        }
      );

      if (!response.ok) {
        throw new Error("Error al actualizar estado.");
      }

      toast.success(
        `Estado cambiado a ${nuevaVentaEstado ? "Vendida" : "Disponible"}`
      );

      // Recargar página para actualizar datos
      window.location.reload();
    } catch (error) {
      console.error(error);
      toast.error("Error al actualizar el estado de la propiedad.");
    } finally {
      setLoading(null);
    }
  };

  const handleEliminar = async (propiedad: Propiedad) => {
    if (!confirm("¿Estás seguro de que quieres eliminar esta propiedad?")) {
      return;
    }

    setLoading(`delete-${propiedad.id}`);

    try {
      const response = await fetch(`/api/propiedades/${propiedad.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error al eliminar la propiedad.");
      }

      toast.success("Propiedad eliminada exitosamente.");
      window.location.reload();
    } catch (error) {
      console.error(error);
      toast.error("Error al eliminar la propiedad.");
    } finally {
      setLoading(null);
    }
  };

  const columns: ColumnDef<Propiedad>[] = [
    {
      accessorKey: "imagenes",
      header: "Imagen",
      cell: ({ row }) => {
        const imagenes: string[] = row.getValue("imagenes");
        const firstImage = imagenes && imagenes.length > 0 ? imagenes[0] : null;
        
        return (
          <div className="flex items-center justify-center w-20 h-20 p-2">
            {firstImage ? (
              <CldImage
                src={firstImage}
                alt={`Imagen de ${row.getValue("title")}`}
                width={80}
                height={80}
                className="w-16 h-16 rounded-md object-cover shadow-sm"
              />
            ) : (
              <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center">
                <Icons.home className="w-6 h-6 text-gray-400" />
              </div>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "title",
      header: "Título",
      cell: ({ row }) => {
        const title: string = row.getValue("title");
        return (
          <div className="text-left font-semibold text-lg py-3 px-2 min-w-[200px]">
            <div className="line-clamp-2">
              {title}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "description",
      header: () => <div className="hidden lg:block">Descripción</div>,
      cell: ({ row }) => {
        const desc: string = row.getValue("description");
        return (
          <div className="hidden lg:block text-left text-sm text-muted-foreground py-3 px-2 max-w-md">
            <div className="line-clamp-3">
              {truncate(desc, 120)}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "linkFacebook",
      header: "Facebook",
      cell: ({ row }) => {
        const link: string = row.getValue("linkFacebook");
        return (
          <div className="flex items-center justify-center py-3">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => window.open(link, '_blank')}
              className="p-2 hover:bg-blue-50 rounded-full"
              title="Ver en Facebook"
            >
              <Icons.facebook className="w-5 h-5 text-blue-600" />
            </Button>
          </div>
        );
      },
    },
    {
      accessorKey: "updatedAt",
      header: "Última modificación",
      cell: ({ row }) => {
        const updatedAt: string = row.getValue("updatedAt");
        return (
          <div className="text-center py-3 px-2 min-w-[140px]">
            <div className="text-sm text-muted-foreground">
              {formatDate(updatedAt)}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "estaVendida",
      header: "Estado",
      cell: ({ row }) => {
        const estaVendida: boolean = row.getValue("estaVendida");
        return (
          <div className="flex items-center justify-center py-3">
            {estaVendida ? (
              <Badge variant="destructive" className="font-medium px-3 py-1">
                Vendida
              </Badge>
            ) : (
              <Badge variant="default" className="font-medium px-3 py-1 bg-green-100 text-green-800 hover:bg-green-200">
                Disponible
              </Badge>
            )}
          </div>
        );
      },
    },
    {
      id: "acciones",
      header: "Acciones",
      cell: ({ row }) => {
        const propiedad = row.original;
        
        return (
          <div className="flex items-center justify-center py-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Abrir menú</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem 
                  onClick={() => window.open(`/propiedades/${propiedad.id}`, '_blank')}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  Ver publicación
                </DropdownMenuItem>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                      <Edit className="mr-2 h-4 w-4" />
                      Modificar publicación
                    </DropdownMenuItem>
                  </DialogTrigger>
                  <PropiedadCrearModal esAlta={false} propiedad={propiedad} />
                </Dialog>
                
                <DropdownMenuItem 
                  onClick={() => handleToggleVendida(propiedad)}
                  disabled={loading === `toggle-${propiedad.id}`}
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  {loading === `toggle-${propiedad.id}` 
                    ? "Actualizando..." 
                    : "Cambiar estado de venta"
                  }
                </DropdownMenuItem>
                
                <DropdownMenuItem 
                  onClick={() => handleEliminar(propiedad)}
                  disabled={loading === `delete-${propiedad.id}`}
                  className="text-red-600 focus:text-red-600"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  {loading === `delete-${propiedad.id}` 
                    ? "Eliminando..." 
                    : "Eliminar publicación"
                  }
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
      enableSorting: false,
      enableHiding: false,
    },
  ];

  const table = useReactTable({
    data: propiedades,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // Componente de tarjeta para móviles
  const MobileCard = ({ propiedad }: { propiedad: Propiedad }) => (
    <div className="border rounded-lg p-4 bg-card shadow-sm">
      <div className="flex gap-3">
        {/* Imagen */}
        <div className="flex-shrink-0">
          {propiedad.imagenes && propiedad.imagenes.length > 0 ? (
            <CldImage
              src={propiedad.imagenes[0]}
              alt={`Imagen de ${propiedad.title}`}
              width={80}
              height={80}
              className="w-20 h-20 rounded-md object-cover border"
            />
          ) : (
            <div className="w-20 h-20 bg-muted rounded-md flex items-center justify-center border">
              <Icons.home className="w-6 h-6 text-muted-foreground" />
            </div>
          )}
        </div>
        
        {/* Contenido */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-base line-clamp-2 pr-2 flex-1">
              {propiedad.title}
            </h3>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0 flex-shrink-0 ml-2">
                  <span className="sr-only">Abrir menú</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem 
                  onClick={() => window.open(`/propiedades/${propiedad.id}`, '_blank')}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  Ver publicación
                </DropdownMenuItem>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                      <Edit className="mr-2 h-4 w-4" />
                      Modificar publicación
                    </DropdownMenuItem>
                  </DialogTrigger>
                  <PropiedadCrearModal esAlta={false} propiedad={propiedad} />
                </Dialog>
                
                <DropdownMenuItem 
                  onClick={() => handleToggleVendida(propiedad)}
                  disabled={loading === `toggle-${propiedad.id}`}
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  {loading === `toggle-${propiedad.id}` 
                    ? "Actualizando..." 
                    : "Cambiar estado de venta"
                  }
                </DropdownMenuItem>
                
                <DropdownMenuItem 
                  onClick={() => handleEliminar(propiedad)}
                  disabled={loading === `delete-${propiedad.id}`}
                  className="text-red-600 focus:text-red-600"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  {loading === `delete-${propiedad.id}` 
                    ? "Eliminando..." 
                    : "Eliminar publicación"
                  }
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {truncate(propiedad.description, 100)}
          </p>
          
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-3">
              {propiedad.estaVendida ? (
                <Badge variant="destructive" className="text-xs px-2 py-1">
                  Vendida
                </Badge>
              ) : (
                <Badge variant="default" className="text-xs px-2 py-1 bg-green-100 text-green-800 hover:bg-green-200">
                  Disponible
                </Badge>
              )}
              
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => window.open(propiedad.linkFacebook, '_blank')}
                className="p-1 h-auto"
                title="Ver en Facebook"
              >
                <Icons.facebook className="w-4 h-4 text-blue-600" />
              </Button>
            </div>
            
            <div className="text-xs text-muted-foreground">
              {formatDate(propiedad.updatedAt)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Botón de agregar arriba de todo */}
      <div className="flex justify-start">
        <Dialog>
          <DialogTrigger asChild>
            <Button size="lg" className="font-semibold">
              Añadir publicación
            </Button>
          </DialogTrigger>
          <PropiedadCrearModal esAlta={true} propiedad={null} />
        </Dialog>
      </div>

      {/* Vista de escritorio y tablet - Tabla */}
      <div className="hidden md:block w-full rounded-md border">
        <Table className="w-full">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="h-12">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="h-24 border-b hover:bg-muted/50 dark:hover:bg-muted/20 transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="p-4 align-top">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No hay ninguna propiedad cargada.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Vista móvil - Tarjetas */}
      <div className="md:hidden space-y-4">
        {propiedades?.length ? (
          propiedades.map((propiedad) => (
            <MobileCard key={propiedad.id} propiedad={propiedad} />
          ))
        ) : (
          <div className="border rounded-lg p-8 text-center text-muted-foreground">
            No hay ninguna propiedad cargada.
          </div>
        )}
      </div>
    </>
  );
}
