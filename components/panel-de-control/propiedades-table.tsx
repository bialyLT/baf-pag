"use client"
 
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"
 
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Checkbox } from "../ui/checkbox";
import { useEffect, useState } from "react";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { PropiedadCrearModal } from "../modals/propiedad-crear-modal";
import { toast } from "sonner";
 
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
    onRowSelectionChange: (selectedRows: Record<string, boolean>) => void;
    
}



export function PropiedadesTable({ propiedades, onRowSelectionChange  }: PropiedadesTableProps) {
    const [rowSelection, setRowSelection] = useState({})
    
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
          accessorKey: 'title',
          header: 'Título',
        },
        {
          accessorKey: 'description',
          header: 'Descripción',
        },
        {
          accessorKey: 'linkFacebook',
          header: 'Link de Facebook',
        },
        {
          accessorKey: 'estaVendida',
          header: 'Vendida',
          cell: info => info.getValue() ? 'Si' : 'No',
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
        }    
    })

    const handleEliminarBoton = () => {
        if (table.getFilteredSelectedRowModel().rows.length > 0) {
            table.getFilteredSelectedRowModel().rows.forEach(async r => {                
                try {
                    const response = await fetch(`/api/propiedades/${r.original.id}`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });
                    if (!response.ok) {
                        throw new Error('Error al eliminar la publicación');
                    }
                    const result = await response.json();
                    console.log(result.message);
                    toast.success("La publicacion se ha eliminado correctamente")
                } catch (error) {
                    console.error('Error:', error);
                }
            })
        } else{
            toast.error("Debes seleccionar alguna publicacion para poder eliminarla")
        }
    };
    
    const handleModificarBoton = () => {
        const selectedRows = table.getFilteredSelectedRowModel().rows;

        if (selectedRows.length == 1) {
            console.log(rowSelection);
            return selectedRows[0].original
        } else {
            console.error('No hay filas seleccionadas');
        }
    }
 
  return (
    <>
      <div className="rounded-md border">
        <Table>
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
                  )
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
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
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
          <PropiedadCrearModal esAlta={true} propiedad={null}/>
        </Dialog>
        <Button variant="destructive" onClick={handleEliminarBoton}>Eliminar publicación</Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button disabled={table.getFilteredSelectedRowModel().rows.length != 1} onClick={handleModificarBoton}>Modificar publicación</Button>
          </DialogTrigger>
          <PropiedadCrearModal
            esAlta={false}
            propiedad={handleModificarBoton()}
            />
        </Dialog>
      </div>
    </>
  )
}