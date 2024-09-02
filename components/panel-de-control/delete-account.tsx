"use client";

import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { SectionColumns } from "@/components/panel-de-control/section-columns";
import { useDeleteAccountModal } from "@/components/modals/delete-account-modal";
import { Icons } from "@/components/shared/icons";

export function DeleteAccountSection() {
  const { setShowDeleteAccountModal, DeleteAccountModal } =
    useDeleteAccountModal();

  const userPaidPlan = true;

  return (
    <>
      <DeleteAccountModal />
      <SectionColumns
        title="Elimina tu cuenta"
        description="Ten cuidado con lo que hagas en esta zona!"
      >
        <div className="flex flex-col gap-4 rounded-xl border border-red-400 p-4 dark:border-red-900">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="text-[15px] font-medium">Estás seguro?</span>
            </div>
            <div className="text-balance text-sm text-muted-foreground">
              Permanentemente borrarás tu cuenta de {siteConfig.name}
              , esta acción no puede ser restaurada.
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              type="submit"
              variant="destructive"
              onClick={() => setShowDeleteAccountModal(true)}
            >
              <Icons.trash className="mr-2 size-4" />
              <span>Eliminar cuenta</span>
            </Button>
          </div>
        </div>
      </SectionColumns>
    </>
  );
}
