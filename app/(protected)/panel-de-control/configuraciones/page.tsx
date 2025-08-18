import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { SettingsPage } from "@/components/dashboard";
import { settingsMetadata } from "@/config/dashboard";

export const metadata = settingsMetadata;

export default async function SettingsPageRoute() {
  const user = await getCurrentUser();

  if (!user?.id) redirect("/login");

  return (
    <SettingsPage user={{ 
      id: user.id, 
      name: user.name || "", 
      role: user.role 
    }} />
  );
}
