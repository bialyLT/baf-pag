import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
    try {
        // Extraer el ID de la URL
        const url = new URL(req.url);
        const id = Number(url.pathname.split('/').pop());
        
        if (!id) {
            return new NextResponse('ID no proporcionado', { status: 400 });
        }
        // Eliminar la propiedad por ID
        await prisma.propiedad.delete({
            where: {
                id: id,
            },
        });
        
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
        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const linkFacebook = formData.get("linkFacebook") as string;
        const imagenes = formData.getAll("imagenes") as string[];
        const estaVendida = formData.get("estaVendida") === "true";

    // Verifica que los datos necesarios estén presentes
    if (!title || !description || !linkFacebook || !imagenes) {
      return NextResponse.json({ message: "Faltan datos necesarios" }, { status: 400 });
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
