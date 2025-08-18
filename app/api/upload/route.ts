import { NextResponse } from "next/server";
import { normalizeTitle } from "@/lib/utils";
import { uploadToCloudinary, deleteFromCloudinary } from "@/lib/cloudinary";

export async function POST(req: Request) {
  try {
    const data = await req.formData();
    const propiedadTitle = normalizeTitle(data.getAll('id')[0] as string);
    const isFirstBatch = data.get('isFirstBatch') === 'true';

    // Solo eliminar imágenes anteriores en el PRIMER lote
    if (isFirstBatch) {
      try {
        await deleteFromCloudinary(propiedadTitle);
        console.log(`🗑️ Imágenes anteriores eliminadas de Cloudinary para: ${propiedadTitle}`);
      } catch (error) {
        console.log('💡 No hay imágenes anteriores para eliminar o error eliminando:', error.message);
      }
    } else {
      console.log('📦 Lote adicional - no eliminando imágenes anteriores');
    }

    // Procesar archivos y subirlos a Cloudinary EN PARALELO
    const dataEntries = Array.from(data.entries());
    console.log("🔍 Procesando archivos para subida a Cloudinary...");
    
    // Filtrar y preparar archivos
    const fileEntries: Array<{ key: string; file: File }> = [];
    
    for (const [key, value] of dataEntries) {
      // Verificar si es un archivo - Compatible con Vercel serverless
      if (key !== 'id' && 
          value && 
          typeof value === 'object' && 
          'name' in value && 
          'size' in value &&
          'type' in value &&
          'arrayBuffer' in value) {
        
        const file = value as File;
        console.log(`📁 Archivo detectado: ${file.name} (${Math.round(file.size/1024)}KB, ${file.type})`);
        fileEntries.push({ key, file });
      }
    }

    if (fileEntries.length === 0) {
      return NextResponse.json(
        { message: "No se encontraron archivos para subir", success: false },
        { status: 400 }
      );
    }

    console.log(`📊 Total de archivos a procesar: ${fileEntries.length}`);

    // Procesar archivos EN PARALELO para mayor velocidad
    const uploadPromises = fileEntries.map(async ({ file }, index) => {
      try {
        console.log(`⬆️ [${index + 1}/${fileEntries.length}] Subiendo: ${file.name}`);
        
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        
        // Subir a Cloudinary
        const imageUrl = await uploadToCloudinary(
          buffer,
          file.name,
          propiedadTitle
        );
        
        console.log(`✅ [${index + 1}/${fileEntries.length}] Completado: ${file.name}`);
        
        return {
          name: file.name,
          url: imageUrl,
          success: true
        };
      } catch (fileError) {
        console.error(`❌ [${index + 1}/${fileEntries.length}] Error con ${file.name}:`, fileError.message);
        return {
          name: file.name,
          error: fileError.message,
          success: false
        };
      }
    });

    // Ejecutar todas las subidas en paralelo
    console.log(`🚀 Iniciando subida en paralelo de ${fileEntries.length} archivos...`);
    const results = await Promise.allSettled(uploadPromises);
    
    // Procesar resultados
    const successfulUploads: string[] = [];
    const successfulFiles: string[] = [];
    const failedUploads: string[] = [];

    results.forEach((result, index) => {
      if (result.status === 'fulfilled' && result.value?.success && result.value.url) {
        successfulUploads.push(result.value.url);
        successfulFiles.push(result.value.name);
      } else if (result.status === 'fulfilled' && !result.value?.success) {
        failedUploads.push(`${result.value?.name || 'archivo desconocido'}: ${result.value?.error || 'error desconocido'}`);
      } else if (result.status === 'rejected') {
        failedUploads.push(`Archivo ${index + 1}: ${result.reason}`);
      }
    });

    console.log(`📊 Resultados: ${successfulUploads.length} exitosos, ${failedUploads.length} fallidos`);
    console.log(`🔗 URLs generadas: ${JSON.stringify(successfulUploads, null, 2)}`);
    
    if (failedUploads.length > 0) {
      console.warn(`⚠️ Archivos fallidos: ${failedUploads.join(', ')}`);
    }

    if (successfulUploads.length > 0) {
      return NextResponse.json(
        { 
          message: successfulFiles,
          urls: successfulUploads,
          success: true,
          uploaded: successfulUploads.length,
          failed: failedUploads.length,
          errors: failedUploads.length > 0 ? failedUploads : undefined
        },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { 
          message: "No se pudieron subir archivos", 
          success: false,
          errors: failedUploads
        },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error('❌ Error subiendo archivos a Cloudinary:', error);
    console.error('❌ Stack trace:', error.stack);
    
    return NextResponse.json(
      { 
        message: "Error interno del servidor", 
        success: false,
        error: error.message,
        // Solo en desarrollo, no en producción
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}
