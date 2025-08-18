import { NextResponse } from "next/server";
import { normalizeTitle } from "@/lib/utils";
import { uploadToCloudinary, deleteFromCloudinary } from "@/lib/cloudinary";

export async function POST(req: Request) {
  try {
    const data = await req.formData();
    const files: File[] = [];
    const uploadedUrls: string[] = [];

    const propiedadTitle = normalizeTitle(data.getAll('id')[0] as string);

    // Eliminar imágenes anteriores de Cloudinary
    try {
      await deleteFromCloudinary(propiedadTitle);
    } catch (error) {
      console.log('No previous images to delete or error deleting:', error);
    }

    // Procesar cada archivo
    const dataEntries = Array.from(data.entries());
    
    for (const [key, value] of dataEntries) {
      if (value instanceof File && key !== 'id') {
        const bytes = await value.arrayBuffer();
        const buffer = Buffer.from(bytes);
        
        // Subir a Cloudinary
        const imageUrl = await uploadToCloudinary(
          buffer,
          value.name,
          propiedadTitle
        );
        
        uploadedUrls.push(imageUrl);
        files.push(value);
      }
    }

    if (files.length > 0) {
      return NextResponse.json(
        { 
          message: files.map(f => f.name),
          urls: uploadedUrls,
          success: true
        },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { message: "No se subieron archivos", success: false },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('❌ Error subiendo archivos a Cloudinary:', error);
    return NextResponse.json(
      { message: "Error interno del servidor", success: false },
      { status: 500 }
    );
  }
}
