import { ReactNode } from "react";
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import { SiteFooter } from "@/components/layout/site-footer";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import { SidebarNavItem } from "@/types";

interface DashboardLayoutProps {
  children: ReactNode;
  links: SidebarNavItem[];
}

export function DashboardLayout({ children, links }: DashboardLayoutProps) {
  return (
    <div className="relative flex min-h-screen w-full"> {/* Added pt-14 for navbar space */}
      <DashboardSidebar links={links} />

      <div className="flex flex-1 flex-col">
        {/* Removed DashboardHeader since SearchCommand is now in main navbar */}
        
        <main className="flex-1 p-4 xl:px-8">
          <MaxWidthWrapper className="flex h-full max-w-7xl flex-col gap-4 px-0 lg:gap-6">
            {children}
          </MaxWidthWrapper>
        </main>
        
        <SiteFooter />
      </div>
    </div>
  );
}
