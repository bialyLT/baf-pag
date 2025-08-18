import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function DELETE(req: Request) {
  try {
    console.log('🧹 Iniciando limpieza de propiedades con imágenes incorrectas...');
    
    // Obtener todas las propiedades
    const allPropiedades = await prisma.propiedad.findMany({
      select: {
        id: true,
        title: true,
        imagenes: true,
        createdAt: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    console.log(`📊 Total de propiedades encontradas: ${allPropiedades.length}`);

    // Encontrar propiedades para eliminar
    const propiedadesParaEliminar = allPropiedades.filter(prop => {
      if (!prop.imagenes || prop.imagenes.length === 0) {
        return true; // Eliminar si no tiene imágenes
      }
      
      const hasCloudinaryImages = prop.imagenes.some(img => 
        img && (img.includes('cloudinary.com') || img.includes('res.cloudinary.com'))
      );
      
      return !hasCloudinaryImages; // Eliminar si no tiene imágenes de Cloudinary
    });

    console.log(`🗑️ Propiedades a eliminar: ${propiedadesParaEliminar.length}`);
    
    let deletedCount = 0;
    
    if (propiedadesParaEliminar.length > 0) {
      // Eliminar propiedades
      const idsToDelete = propiedadesParaEliminar.map(p => p.id);
      
      const deleteResult = await prisma.propiedad.deleteMany({
        where: {
          id: {
            in: idsToDelete
          }
        }
      });

      deletedCount = deleteResult.count;
      console.log(`✅ Eliminadas ${deletedCount} propiedades de la base de datos`);
    }

    // Obtener propiedades restantes
    const remainingPropiedades = await prisma.propiedad.findMany({
      select: {
        id: true,
        title: true,
        imagenes: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json({
      success: true,
      message: `Limpieza completada. ${deletedCount} propiedades eliminadas.`,
      deleted: deletedCount,
      remaining: remainingPropiedades.length,
      remainingPropiedades: remainingPropiedades.map(p => ({
        id: p.id,
        title: p.title,
        imageCount: p.imagenes ? p.imagenes.length : 0,
        hasCloudinaryImages: p.imagenes ? p.imagenes.some(img => 
          img && (img.includes('cloudinary.com') || img.includes('res.cloudinary.com'))
        ) : false
      }))
    }, { status: 200 });

  } catch (error) {
    console.error('❌ Error durante la limpieza:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: "Error durante la limpieza", 
        error: error.message 
      },
      { status: 500 }
    );
  }
}
