import { DashboardLayout, getDashboardUser, getFilteredSidebarLinks } from "@/components/dashboard";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export default async function Dashboard({ children }: ProtectedLayoutProps) {
  const user = await getDashboardUser();
  const filteredLinks = getFilteredSidebarLinks(user.role);

  return <DashboardLayout links={filteredLinks}>{children}</DashboardLayout>;
}
