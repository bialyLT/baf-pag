import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  try {
    const data = await req.formData();
    const files: File[] = [];
    const fileUploadPromises: Promise<void>[] = [];

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
        const filePath = path.join(process.cwd(), 'public/uploads', f.name);
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
