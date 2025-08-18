import { createSamplePropiedades } from "@/lib/sample-data";
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    await createSamplePropiedades();
    return NextResponse.json({ message: "Datos de ejemplo creados exitosamente" }, { status: 200 });
  } catch (error) {
    console.error("Error al crear datos de ejemplo:", error);
    return NextResponse.json({ message: "Error interno del servidor" }, { status: 500 });
  }
}
