"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
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
import { PropiedadCrearModal } from "../modals/propiedad-crear-modal";
import { toast } from "sonner";
import { truncate } from "@/lib/utils";

interface Propiedad {
  id: string;
  title: string;
  description: string;
  linkFacebook: string;
  imagenes: string[];
  estaVendida: boolean;
}

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
      accessorKey: "title",
      header: "Título",
      cell: ({ row }) => {
        const title: string = row.getValue("title");
        return (
          <div className="text-left font-medium">
            {truncate(title.toString(), 20)}
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
          <div className="text-left font-medium">
            {truncate(desc.toString(), 20)}
          </div>
        );
      },
    },
    {
      accessorKey: "linkFacebook",
      header: "Link de Facebook",
    },
    {
      accessorKey: "estaVendida",
      header: "Vendida",
      cell: (info) => (info.getValue() ? "Si" : "No"),
    },
  ];

  const table = useReactTable({
    data: propiedades,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    getPaginationRowModel: getPaginationRowModel(),
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
      <div className="rounded-md border">
      <div className="rounded-md border min-h-[400px]">
        <Table className="w-full overflow-auto">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
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
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
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
        <div className="flex items-center justify-between p-4">
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Anterior
            </Button>
            <Button
              variant="outline"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Siguiente
            </Button>
          </div>
          <span className="text-sm">
            Página{" "}
            <strong>
              {table.getState().pagination.pageIndex + 1} de{" "}
              {table.getPageCount()}
            </strong>
          </span>
        </div>
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
