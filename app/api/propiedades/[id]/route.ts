import { prisma } from "@/lib/db";
import { normalizeTitle } from "@/lib/utils";
import { rm } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

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

        // Eliminar las fotos de la propiedad
            // Crear la carpeta con el ID de la propiedad si no existe
        const propertyFolderPath = path.join(process.cwd(), 'public/_static/images/propiedades', propiedadTitle);
            // Eliminar la carpeta existente y su contenido
        await rm(propertyFolderPath, { recursive: true, force: true });

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
        
        if (!id) {
            return new NextResponse('ID no proporcionado', { status: 400 });
        }

        // Parsear el cuerpo de la solicitud
        const title = formData.getAll("title")[0] as string;
        const description = formData.getAll("description")[0] as string;
        const linkFacebook = formData.getAll("linkFacebook")[0] as string;
        const imagenes: string[] = formData.getAll('imagenes') as string[];
        const estaVendida = formData.getAll("estaVendida")[0] === "true";

    // Verifica que los datos necesarios estén presentes
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
        console.error(error);
        return new NextResponse("Internal server error", { status: 500 });
    }
}