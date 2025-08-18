import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { DashboardHeader } from "@/components/panel-de-control/header";
import { EmptyPlaceholder } from "@/components/shared/empty-placeholder";
import { PropiedadCrearModal } from "@/components/modals/propiedad-crear-modal";
import { PropiedadesTable } from "@/components/panel-de-control/propiedades-table";
import { Propiedad } from "@/types";

interface DashboardPageProps {
  userName?: string;
  propiedades: Propiedad[];
}

export function DashboardPage({ userName, propiedades }: DashboardPageProps) {
  return (
    <div className="space-y-6">
      <DashboardHeader
        heading="Panel de control"
        text={`Bienvenido ${userName}!`}
      />
      
      {/* Línea separadora */}
      <div className="border-b border-border"></div>
      
      {propiedades.length ? (
        <PropiedadesTable propiedades={propiedades} />
      ) : (
        <EmptyPropiedadesState />
      )}
    </div>
  );
}

function EmptyPropiedadesState() {
  return (
    <EmptyPlaceholder>
      <EmptyPlaceholder.Icon name="post" />
      <EmptyPlaceholder.Title>No hay publicaciones creadas</EmptyPlaceholder.Title>
      <EmptyPlaceholder.Description>
        Todavía no tenes publicaciones, ¿Deseas agregar una nueva publicación?
      </EmptyPlaceholder.Description>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Añadir publicación</Button>
        </DialogTrigger>
        <PropiedadCrearModal esAlta={undefined} propiedad={undefined} />
      </Dialog>
    </EmptyPlaceholder>
  );
}
