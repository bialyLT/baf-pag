import { prisma } from "@/lib/db";

export const getAllPropiedades = async () => {
  try {
    const propiedades = await prisma.propiedad.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        linkFacebook: true,
        imagenes: true,
        estaVendida: true,
      },
    });

    return propiedades;
  } catch (error) {
    console.error("Error al obtener las propiedades en lib:", error);
    return [];
  }
};

export const getAllPropiedadesId = async () => {
  try {
    const propiedades = await prisma.propiedad.findMany({
      select: {
        id: true
      },
    });

    return propiedades;
  } catch (error) {
    console.error("Error al obtener los id de las propiedades:", error);
    return [];
  }
};


export const getPropiedadPorId = async (id: number) => {
  try {
    const propiedad = await prisma.propiedad.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        description: true,
        linkFacebook: true,
        imagenes: true,
        estaVendida: true,
      },
    });

    return propiedad;
  } catch (error) {
    console.error("Error al obtener propiedad:", error);
    return null;
  }
};
