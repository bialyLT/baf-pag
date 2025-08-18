import { prisma } from "@/lib/db";
import { normalizeTitle } from "@/lib/utils";
import { deleteFromCloudinary } from "@/lib/cloudinary";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
    try {
        // Extraer el ID de la URL
        const url = new URL(req.url);
        const id = Number(url.pathname.split('/').pop());
        const propiedadTitle = normalizeTitle(url.searchParams.get('title') as string);
        
        if (!id) {
            return new NextResponse('ID no proporcionado', { status: 400 });
        }
        
        // Eliminar la propiedad por ID
        await prisma.propiedad.delete({
            where: {
                id: id,
            },
        });

        // Eliminar las imágenes de Cloudinary
        try {
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
        const title = formData.getAll("title")[0] as string;
        const description = formData.getAll("description")[0] as string;
        const linkFacebook = formData.getAll("linkFacebook")[0] as string;
        const imagenesRaw = formData.getAll('imagenes')[0] as string;
        const estaVendida = formData.getAll("estaVendida")[0] === "true";

        // Si solo se están actualizando las imágenes (caso de Cloudinary)
        if (imagenesRaw && !title && !description && !linkFacebook) {
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
        const imagenes: string[] = imagenesRaw ? JSON.parse(imagenesRaw) : [];
        
        // Verifica que los datos necesarios estén presentes para actualización completa
        if (!title || !description || !linkFacebook) {
          return NextResponse.json({ message: "Faltan datos necesarios" }, { status: 400 });
        }

        if (imagenes.length == 0) {
            return NextResponse.json({ message: "Debes ingresar una imagen como mínimo"}, { status: 401 });
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