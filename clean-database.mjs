// Script para limpiar propiedades con imágenes incorrectas
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function cleanDatabase() {
  try {
    console.log('🔍 Analizando propiedades en la base de datos...');
    
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

    console.log(`📊 Total de propiedades encontradas: ${allPropiedades.length}\n`);

    // Analizar cada propiedad
    const propiedadesParaEliminar = [];
    
    allPropiedades.forEach((prop, index) => {
      console.log(`📋 Propiedad ${index + 1}: "${prop.title}" (ID: ${prop.id})`);
      console.log(`   Creada: ${prop.createdAt}`);
      console.log(`   Número de imágenes: ${prop.imagenes ? prop.imagenes.length : 0}`);
      
      if (prop.imagenes && prop.imagenes.length > 0) {
        const hasCloudinaryImages = prop.imagenes.some(img => 
          img && (img.includes('cloudinary.com') || img.includes('res.cloudinary.com'))
        );
        
        const hasLocalImages = prop.imagenes.some(img => 
          img && !img.includes('cloudinary.com') && !img.includes('res.cloudinary.com')
        );

        if (hasCloudinaryImages) {
          console.log(`   ✅ Tiene imágenes de Cloudinary`);
          prop.imagenes.forEach((img, imgIndex) => {
            console.log(`      Imagen ${imgIndex + 1}: ${img.slice(0, 80)}...`);
          });
        } else if (hasLocalImages) {
          console.log(`   ❌ Solo tiene imágenes locales (debe eliminarse)`);
          propiedadesParaEliminar.push(prop);
        } else {
          console.log(`   ⚠️ Sin imágenes válidas`);
          propiedadesParaEliminar.push(prop);
        }
      } else {
        console.log(`   ⚠️ Sin imágenes (debe eliminarse)`);
        propiedadesParaEliminar.push(prop);
      }
      
      console.log('');
    });

    console.log(`🗑️ Propiedades a eliminar: ${propiedadesParaEliminar.length}`);
    
    if (propiedadesParaEliminar.length > 0) {
      console.log('\n¿Eliminar las siguientes propiedades?');
      propiedadesParaEliminar.forEach(prop => {
        console.log(`   - "${prop.title}" (ID: ${prop.id})`);
      });
      
      // Eliminar propiedades
      const idsToDelete = propiedadesParaEliminar.map(p => p.id);
      
      const deleteResult = await prisma.propiedad.deleteMany({
        where: {
          id: {
            in: idsToDelete
          }
        }
      });

      console.log(`\n✅ Eliminadas ${deleteResult.count} propiedades de la base de datos`);
    } else {
      console.log('\n✅ No hay propiedades para eliminar');
    }

    console.log('\n🎉 Limpieza completada!');

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Ejecutar solo si se llama directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  cleanDatabase();
}

export default cleanDatabase;
