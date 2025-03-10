import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
    try {
        // Extraer el ID de la URL
        const url = new URL(req.url);
        const match = url.pathname.match(/\/api\/propiedades\/(\d+)\/esVendida/);
        const id = match ? Number(match[1]) : null;
        if (!id) {
            return new NextResponse('ID no proporcionado', { status: 400 });
        }

        // Parsear el cuerpo de la solicitud
        const { estaVendida } = await req.json();

        // Validar que sea un booleano
        if (typeof estaVendida !== "boolean") {
            return new NextResponse('Valor inválido para "estaVendida"', { status: 400 });
        }

        // Actualizar solo el campo `estaVendida`
        const updatedPropiedad = await prisma.propiedad.update({
            where: { id },
            data: { estaVendida },
        });

        return new NextResponse(JSON.stringify(updatedPropiedad), { status: 200 });
    } catch (error) {
        console.error(error);
        return new NextResponse("Internal server error", { status: 500 });
    }
}