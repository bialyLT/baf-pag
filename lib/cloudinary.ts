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

export default cloudinary;
