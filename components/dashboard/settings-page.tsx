import { DashboardHeader } from "@/components/panel-de-control/header";
import { UserNameForm } from "@/components/forms/user-name-form";
import { UserRoleForm } from "@/components/forms/user-role-form";
import { DeleteAccountSection } from "@/components/panel-de-control/delete-account";
import { UserRole } from "@prisma/client";

interface SettingsPageProps {
  user: {
    id: string;
    name: string | null;
    role: UserRole;
  };
}

export function SettingsPage({ user }: SettingsPageProps) {
  return (
    <>
      <DashboardHeader
        heading="Configuraciones"
        text="Administra tu cuenta y las configuraciones de la página"
      />
      
      <div className="divide-y divide-muted pb-10">
        <UserNameForm user={{ id: user.id, name: user.name || "" }} />
        <UserRoleForm user={{ id: user.id, role: user.role }} />
        <DeleteAccountSection />
      </div>
    </>
  );
}
