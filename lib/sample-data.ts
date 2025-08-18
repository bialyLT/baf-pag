import { prisma } from "@/lib/db";

export async function createSamplePropiedades() {
  try {
    // Verificar si ya hay propiedades
    const existingPropiedades = await prisma.propiedad.count();
    
    if (existingPropiedades > 0) {
      console.log(`Ya existen ${existingPropiedades} propiedades en la base de datos`);
      return;
    }

    // Crear propiedades de ejemplo
    const sampleData = [
      {
        title: "Casa moderna en el centro",
        description: "Hermosa casa de 3 habitaciones con jardín, ubicada en zona céntrica con todos los servicios disponibles.",
        linkFacebook: "https://facebook.com/propiedad1",
        imagenes: ["https://ejemplo.com/imagen1.jpg", "https://ejemplo.com/imagen2.jpg"],
        estaVendida: false,
      },
      {
        title: "Departamento amueblado",
        description: "Departamento completamente amueblado de 2 habitaciones, ideal para pareja joven o profesionales.",
        linkFacebook: "https://facebook.com/propiedad2", 
        imagenes: ["https://ejemplo.com/imagen3.jpg"],
        estaVendida: false,
      },
      {
        title: "Terreno con vista al mar",
        description: "Excelente terreno de 500m² con vista panorámica al mar, perfecto para construir la casa de tus sueños.",
        linkFacebook: "https://facebook.com/propiedad3",
        imagenes: ["https://ejemplo.com/imagen4.jpg", "https://ejemplo.com/imagen5.jpg"],
        estaVendida: true,
      },
      {
        title: "Local comercial céntrico",
        description: "Local comercial en la zona más transitada de la ciudad, ideal para cualquier tipo de negocio.",
        linkFacebook: "https://facebook.com/propiedad4",
        imagenes: ["https://ejemplo.com/imagen6.jpg"],
        estaVendida: false,
      },
    ];

    // Insertar las propiedades de ejemplo
    for (const propiedad of sampleData) {
      await prisma.propiedad.create({
        data: propiedad,
      });
    }

    console.log("Propiedades de ejemplo creadas exitosamente");
  } catch (error) {
    console.error("Error al crear propiedades de ejemplo:", error);
  }
}
