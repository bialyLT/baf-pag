import { createSamplePropiedades } from "@/lib/sample-data";
import { NextResponse } from 'next/server';
import { requireAdmin } from "@/lib/api-auth";

export async function POST(req: Request) {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ message: "No encontrado" }, { status: 404 });
  }

  const check = await requireAdmin();
  if (!check.authorized) {
    return NextResponse.json({ message: "No autorizado" }, { status: check.status });
  }

  try {
    await createSamplePropiedades();
    return NextResponse.json({ message: "Datos de ejemplo creados exitosamente" }, { status: 200 });
  } catch (error) {
    console.error("Error al crear datos de ejemplo:", error);
    return NextResponse.json({ message: "Error interno del servidor" }, { status: 500 });
  }
}
