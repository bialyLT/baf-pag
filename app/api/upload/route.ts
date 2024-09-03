import { NextResponse } from "next/server";
import { writeFile, mkdir, readdir, unlink } from "fs/promises";
import path from "path";
import { normalizeTitle } from "@/lib/utils";

export async function POST(req: Request) {
  try {
    const data = await req.formData();
    const files: File[] = [];
    const fileUploadPromises: Promise<void>[] = [];

    const propiedadTitle = normalizeTitle(data.getAll('id')[0] as string)

    // Crear la carpeta con el ID de la propiedad si no existe
    const propertyFolderPath = path.join(process.cwd(), 'public/_static/images/propiedades', propiedadTitle);
    await mkdir(propertyFolderPath, { recursive: true });

    // Eliminar archivos existentes en el directorio
    const existingFiles = await readdir(propertyFolderPath);
    const deletePromises = existingFiles.map(file =>
      unlink(path.join(propertyFolderPath, file))
    );
    await Promise.all(deletePromises);

    data.forEach( async f => {
      if (!(f instanceof File)) {
        return NextResponse.json(
          { message: "Debes ingresar un archivo" },
          { status: 400 }
        );
      }

      const fileUploadPromise = (async () => {
        const bytes = await f.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const filePath = path.join(process.cwd(), 'public/_static/images/propiedades/', propiedadTitle, f.name);
        console.log(filePath);
        await writeFile(filePath, buffer);
        files.push(f);
      })();

      fileUploadPromises.push(fileUploadPromise);
    })
    await Promise.all(fileUploadPromises);
    if (files.length > 0) {
      return NextResponse.json(
        { message: files },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { message: "No files uploaded" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
