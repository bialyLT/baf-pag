import { getCurrentUser } from "@/lib/session";
import { constructMetadata } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { DashboardHeader } from "@/components/panel-de-control/header";
import { EmptyPlaceholder } from "@/components/shared/empty-placeholder";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { PropiedadCrearModal } from "@/components/modals/propiedad-crear-modal";
import { getAllPropiedades } from "@/lib/propiedades";
import { PropiedadesTable } from "@/components/panel-de-control/propiedades-table";
import { Propiedad } from "@/types";

export const metadata = constructMetadata({
  title: "Panel de control – BAF",
  description: "Panel de control de baf bienesraices",
});


export default async function DashboardPage() {
  const user = await getCurrentUser();
  const publicaciones = await getAllPropiedades();

  return (
    <>
      <DashboardHeader
        heading="Panel de control"
        text={`Bienvenido ${user?.name}!`}
      />
      {publicaciones.length
      ?
        <PropiedadesTable propiedades={publicaciones as unknown as Propiedad[]} onRowSelectionChange={function (selectedRows: Record<string, boolean>): void {
          throw new Error("Function not implemented.");
        } }  />
      : <EmptyPlaceholder>
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
      </EmptyPlaceholder>}
    </>
  );
}
