import { prisma } from "@/lib/db";
import { NextResponse } from 'next/server';
import { getAllPropiedades } from "@/lib/propiedades";

export async function GET(req: Request) {
  try {
    const data = await getAllPropiedades();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error al obtener propiedades:", error);
    return NextResponse.json({ message: "Error interno del servidor" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  console.log('que onda');
    const formData = await req.formData();
  try {

    const title = formData.getAll("title")[0] as string;
    const description = formData.getAll("description")[0] as string;
    const linkFacebook = formData.getAll("linkFacebook")[0] as string;
    const imagenes = formData.getAll("imagenes") as string[];
    const estaVendida = formData.getAll("estaVendida")[0] === "true";

    // Verifica que los datos necesarios estén presentes
    if (!title || !description || !linkFacebook || !imagenes) {
      return NextResponse.json({ message: "Faltan datos necesarios" }, { status: 400 });
    }

    // Crear una nueva propiedad en la base de datos
    const nuevaPropiedad = await prisma.propiedad.create({
      data: {
        title,
        description,
        linkFacebook,
        imagenes,
        estaVendida,
      },
    });

    return NextResponse.json({ message: "Propiedad agregada" }, { status: 201 });
  } catch (error) {
    console.error("Error creando propiedad:", error);
    return NextResponse.json({ message: "Error interno del servidor" }, { status: 500 });
  }
}

