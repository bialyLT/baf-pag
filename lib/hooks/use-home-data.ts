import { getAllPropiedades } from "@/lib/propiedades";
import { Propiedad } from "@prisma/client";

/**
 * Hook para obtener propiedades con revalidación
 */
export async function useHomeData() {
  try {
    const propiedades = await getAllPropiedades();
    return {
      propiedades,
      error: null
    };
  } catch (error) {
    console.error('Error fetching propiedades:', error);
    return {
      propiedades: [] as Propiedad[],
      error: error instanceof Error ? error.message : 'Error desconocido'
    };
  }
}
