
import { HomePageContent } from "@/components/home";
import { homeMetadata } from "@/config/site";

export const revalidate = 10;
export const metadata = homeMetadata;

export default function IndexPage() {
  // Ya no necesitamos cargar propiedades para la página principal
  return <HomePageContent propiedades={[]} />;
}
