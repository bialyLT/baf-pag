import { Button } from "@/components/ui/button"
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { PropiedadCrearForm } from "../forms/propiedad-crear-form"

export function PropiedadCrearModal({esAlta, propiedad}) {
  return (
    <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          {esAlta ? <DialogTitle>Nueva publicación</DialogTitle> : <DialogTitle>Modificar publicación</DialogTitle>}
          <DialogDescription>
            {esAlta ? "Estas creando una nueva publicación" : "Estas modificando una publicación"}
          </DialogDescription>
        </DialogHeader>
        <PropiedadCrearForm propiedad={propiedad}  />
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cerrar
            </Button>
          </DialogClose>
        </DialogFooter>
    </DialogContent>
  )
}
