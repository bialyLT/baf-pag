import { v2 as cloudinary } from 'cloudinary';
import { env } from '@/env.mjs';

// Configurar Cloudinary
cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

export async function uploadToCloudinary(
  file: Buffer,
  fileName: string,
  folder: string
): Promise<string> {
  try {
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          resource_type: 'auto',
          folder: `baf-propiedades/${folder}`,
          public_id: fileName.split('.')[0], // Sin extensión
          overwrite: true,
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(file);
    });

    return (result as any).secure_url;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw error;
  }
}

export async function deleteFromCloudinary(folder: string): Promise<void> {
  try {
    await cloudinary.api.delete_resources_by_prefix(`baf-propiedades/${folder}`);
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
    throw error;
  }
}

export async function deleteSpecificImagesFromCloudinary(imageUrls: string[]): Promise<void> {
  try {
    console.log(`🗑️ Intentando eliminar ${imageUrls.length} imágenes específicas de Cloudinary`);
    
    // Extraer public_ids de las URLs de Cloudinary
    const publicIds: string[] = imageUrls
      .map(url => {
        // URL ejemplo: https://res.cloudinary.com/dm3mcv5us/image/upload/v1234567890/baf-propiedades/folder/filename.jpg
        const matches = url.match(/\/baf-propiedades\/(.+)$/);
        if (matches) {
          // Remover la extensión del archivo
          const pathWithoutExtension = matches[1].replace(/\.[^/.]+$/, '');
          return `baf-propiedades/${pathWithoutExtension}`;
        }
        return null;
      })
      .filter((id): id is string => id !== null);

    console.log(`📋 Public IDs extraídos:`, publicIds);

    if (publicIds.length > 0) {
      const result = await cloudinary.api.delete_resources(publicIds);
      console.log(`✅ Resultado de eliminación:`, result);
      
      // Log de éxitos y errores
      if (result.deleted) {
        Object.entries(result.deleted).forEach(([publicId, status]) => {
          if (status === 'deleted') {
            console.log(`✅ Eliminada: ${publicId}`);
          } else {
            console.log(`⚠️ No eliminada: ${publicId} - ${status}`);
          }
        });
      }
    }
  } catch (error) {
    console.error('❌ Error eliminando imágenes específicas de Cloudinary:', error);
    throw error;
  }
}

export default cloudinary;
