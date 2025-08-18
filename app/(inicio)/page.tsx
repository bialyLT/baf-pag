
import { HomePageContent } from "@/components/home";
import { getAllPropiedades } from "@/lib/propiedades";
import { homeMetadata } from "@/config/site";

export const revalidate = 10;
export const metadata = homeMetadata;

export default async function IndexPage() {
  const propiedades = await getAllPropiedades();
  
  return <HomePageContent propiedades={propiedades} />;
}
