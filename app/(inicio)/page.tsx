import Publicaciones from "@/components/sections/publicaciones";
import HeroLanding from "@/components/sections/hero-landing";
import { getAllPropiedades } from "@/lib/propiedades";
export default async function IndexPage() {

  const propiedades = await getAllPropiedades();
  return (
    <>
      <HeroLanding />
      <Publicaciones propiedades={propiedades} />
    </>
  );
}
