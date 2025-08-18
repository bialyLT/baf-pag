import { StatsPage } from "@/components/dashboard";
import { statsMetadata } from "@/config/dashboard";

export const metadata = statsMetadata;

export default function StatsPageRoute() {
  return <StatsPage />;
}
