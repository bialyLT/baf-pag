import { Skeleton } from "@/components/ui/skeleton";
import { DashboardHeader } from "@/components/panel-de-control/header";

export default function DashboardLoading() {
  return (
    <>
      <DashboardHeader heading="Panel de control" text="Role Actual:" />
      <Skeleton className="size-full rounded-lg" />
    </>
  );
}
