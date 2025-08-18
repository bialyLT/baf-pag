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

interface PropiedadesTableProps {
  propiedades: Propiedad[];
}

export function PropiedadesTable({ propiedades }: PropiedadesTableProps) {
  const [rowSelection, setRowSelection] = useState({});

  const [loading, setLoading] = useState(false);

  const handleToggleVendida = async () => {
    const selectedRows = table.getFilteredSelectedRowModel().rows;
    if (selectedRows.length !== 1) {
      toast.error("Selecciona una propiedad para modificar.");
      return;
    }

    const propiedad = selectedRows[0].original;
    const nuevaVentaEstado = !propiedad.estaVendida;

    setLoading(true);

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

      // Actualizar UI manualmente sin recargar la página
      propiedad.estaVendida = nuevaVentaEstado;
      table.resetRowSelection();
    } catch (error) {
      console.error(error);
      toast.error("Error al actualizar el estado de la propiedad.");
    } finally {
      setLoading(false);
    }
  };

  const columns: ColumnDef<Propiedad>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
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
      header: "Descripción",
      cell: ({ row }) => {
        const desc: string = row.getValue("description");
        return (
          <div className="text-left text-sm text-muted-foreground py-3 px-2 max-w-md">
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
  ];

  const table = useReactTable({
    data: propiedades,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
  });

  const handleEliminarBoton = () => {
    if (table.getFilteredSelectedRowModel().rows.length > 0) {
      table.getFilteredSelectedRowModel().rows.forEach(async (r) => {
        try {
          const response = await fetch(
            `/api/propiedades/${r.original.id}?title=${encodeURIComponent(r.original.title)}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (!response.ok) {
            throw new Error("Error al eliminar la publicación");
          }
          const result = await response.json();
          console.log(result.message);
          toast.success("La publicacion se ha eliminado correctamente");
        } catch (error) {
          console.error("Error:", error);
        }
      });
    } else {
      toast.error("Debes seleccionar alguna publicacion para poder eliminarla");
    }
  };

  const handleModificarBoton = () => {
    const selectedRows = table.getFilteredSelectedRowModel().rows;

    if (selectedRows.length == 1) {
      return selectedRows[0].original;
    } else {
      console.error("No hay filas seleccionadas");
    }
  };

  return (
    <>
      <div className="w-full rounded-md border">
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
                  data-state={row.getIsSelected() && "selected"}
                  className="h-24 border-b"
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
      <div className="flex justify-center gap-5">
        <Dialog>
          <DialogTrigger asChild>
            <Button>Añadir publicación</Button>
          </DialogTrigger>
          <PropiedadCrearModal esAlta={true} propiedad={null} />
        </Dialog>
        <Button variant="destructive" onClick={handleEliminarBoton}>
          Eliminar publicación
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              disabled={table.getFilteredSelectedRowModel().rows.length != 1}
              onClick={handleModificarBoton}
            >
              Modificar publicación
            </Button>
          </DialogTrigger>
          <PropiedadCrearModal
            esAlta={false}
            propiedad={handleModificarBoton()}
          />
        </Dialog>
        <Button
          variant="ghost"
          onClick={handleToggleVendida}
          disabled={
            table.getFilteredSelectedRowModel().rows.length !== 1 || loading
          }
        >
          {loading ? "Actualizando..." : "Cambiar estado de venta"}
        </Button>
      </div>
    </>
  );
}
