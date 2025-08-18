import { ReactNode } from "react";
import { DashboardSidebar, MobileSheetSidebar } from "@/components/layout/dashboard-sidebar";
import { ModeToggle } from "@/components/layout/mode-toggle";
import { UserAccountNav } from "@/components/layout/user-account-nav";
import { SearchCommand } from "@/components/panel-de-control/search-command";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import { SidebarNavItem } from "@/types";

interface DashboardLayoutProps {
  children: ReactNode;
  links: SidebarNavItem[];
}

export function DashboardLayout({ children, links }: DashboardLayoutProps) {
  return (
    <div className="relative flex min-h-screen w-full">
      <DashboardSidebar links={links} />

      <div className="flex flex-1 flex-col">
        <DashboardHeader links={links} />
        
        <main className="flex-1 p-4 xl:px-8">
          <MaxWidthWrapper className="flex h-full max-w-7xl flex-col gap-4 px-0 lg:gap-6">
            {children}
          </MaxWidthWrapper>
        </main>
      </div>
    </div>
  );
}

function DashboardHeader({ links }: { links: SidebarNavItem[] }) {
  return (
    <header className="sticky top-0 z-50 flex h-14 bg-background px-4 lg:h-[60px] xl:px-8">
      <MaxWidthWrapper className="flex max-w-7xl items-center gap-x-3 px-0">
        <MobileSheetSidebar links={links} />

        <div className="w-full flex-1">
          <SearchCommand links={links} />
        </div>

        <ModeToggle />
        <UserAccountNav />
      </MaxWidthWrapper>
    </header>
  );
}
