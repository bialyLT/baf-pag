import { prisma } from "@/lib/db";
import { normalizeTitle } from "@/lib/utils";
import { deleteFromCloudinary, deleteSpecificImagesFromCloudinary } from "@/lib/cloudinary";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
    try {
        // Extraer el ID de la URL
        const url = new URL(req.url);
        const id = Number(url.pathname.split('/').pop());
        const titleParam = url.searchParams.get('title');
        
        if (!id) {
            return new NextResponse('ID no proporcionado', { status: 400 });
        }
        
        // Eliminar la propiedad por ID
        const deletedPropiedad = await prisma.propiedad.delete({
            where: {
                id: id,
            },
        });

        // Eliminar las imágenes de Cloudinary usando el título de la propiedad eliminada
        try {
            const propiedadTitle = normalizeTitle(titleParam || deletedPropiedad.title);
            await deleteFromCloudinary(propiedadTitle);
            console.log(`🗑️ Imágenes eliminadas de Cloudinary para: ${propiedadTitle}`);
        } catch (error) {
            console.log(`⚠️ Error eliminando imágenes de Cloudinary: ${error.message}`);
        }

        return new NextResponse(JSON.stringify({ message: "Publicación eliminada exitosamente!" }), { status: 200 });
    } catch (error) {
        console.error(error);
        return new NextResponse("Internal server error", { status: 500 });
    }
}

export async function PATCH(req: Request) {
    
    const formData = await req.formData();
    try {
        // Extraer el ID de la URL
        const url = new URL(req.url);
        const id = Number(url.pathname.split('/').pop());
        
        if (!id || isNaN(id)) {
            console.error("ID inválido:", url.pathname);
            return new NextResponse('ID no proporcionado o inválido', { status: 400 });
        }

        console.log("Procesando PATCH para propiedad ID:", id);

        // Parsear el cuerpo de la solicitud
        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const linkFacebook = formData.get("linkFacebook") as string || "";
        const imagenesRaw = formData.get('imagenes') as string;
        const estaVendida = formData.get("estaVendida") === "true";
        
        // Obtener imágenes existentes del formulario actualizado
        const existingImages = formData.getAll("existingImages") as string[];
        const deletedImages = formData.getAll("deletedImages") as string[];

        console.log("Datos recibidos:", {
            title: title ? "✅" : "❌",
            description: description ? "✅" : "❌", 
            linkFacebook,
            imagenesRaw: imagenesRaw ? "✅" : "❌",
            existingImagesCount: existingImages.length,
            deletedImagesCount: deletedImages.length,
            estaVendida
        });
        
        console.log("ExistingImages array:", existingImages);
        console.log("DeletedImages array:", deletedImages);

        // Si solo se están actualizando las imágenes (caso de Cloudinary)
        if (imagenesRaw && !title && !description) {
            try {
                const imagenes = JSON.parse(imagenesRaw);
                console.log("Actualizando solo imágenes con URLs de Cloudinary:", imagenes);
                
                const updatedPropiedad = await prisma.propiedad.update({
                    where: { id: id },
                    data: {
                        imagenes: imagenes
                    },
                });

                return new NextResponse(JSON.stringify({
                    message: "Imágenes actualizadas exitosamente",
                    propiedad: updatedPropiedad
                }), { status: 200 });
            } catch (parseError) {
                console.error("Error parseando imágenes JSON:", parseError);
                return new NextResponse('Error en formato de imágenes', { status: 400 });
            }
        }

        // Actualización completa de la propiedad
        let imagenes: string[] = [];
        
        // Si hay imágenes existentes, usarlas
        if (existingImages.length > 0) {
            imagenes = existingImages;
        }
        // Si hay imágenes como JSON, parsearlas
        else if (imagenesRaw) {
            try {
                imagenes = JSON.parse(imagenesRaw);
            } catch {
                imagenes = [];
            }
        }
        
        // Verifica que los datos necesarios estén presentes para actualización completa
        if (!title || !description) {
          return NextResponse.json({ message: "Título y descripción son requeridos" }, { status: 400 });
        }

        if (imagenes.length === 0) {
            return NextResponse.json({ message: "Debes tener al menos una imagen"}, { status: 400 });
        }

        console.log("Actualizando propiedad con:", {
            title,
            description,
            linkFacebook,
            imagenes: imagenes.length,
            estaVendida
        });

        // Eliminar imágenes específicas de Cloudinary si hay algunas para eliminar
        if (deletedImages.length > 0) {
            try {
                console.log(`🗑️ Eliminando ${deletedImages.length} imágenes de Cloudinary...`);
                await deleteSpecificImagesFromCloudinary(deletedImages);
                console.log(`✅ Imágenes eliminadas exitosamente de Cloudinary`);
            } catch (cloudinaryError) {
                console.error("⚠️ Error eliminando imágenes de Cloudinary:", cloudinaryError);
                // No fallar toda la operación si Cloudinary falla
            }
        }

        // Actualizar la propiedad por ID
        const updatedPropiedad = await prisma.propiedad.update({
            where: { id: id },
            data: {
                title,
                description,
                linkFacebook,
                imagenes,
                estaVendida
            },
        });

        return new NextResponse(JSON.stringify(updatedPropiedad), { status: 200 });
    } catch (error) {
        console.error("Error en PATCH:", error);
        return new NextResponse("Internal server error", { status: 500 });
    }
}