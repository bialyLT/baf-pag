"use client"

import { propiedadSchema } from "@/lib/validations/propiedad";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner";
import { z } from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";

export function PropiedadCrearForm({propiedad}) {
  const [files, setFiles] = useState<File[]>([]);

  const form = useForm<z.infer<typeof propiedadSchema>>({
    resolver: zodResolver(propiedadSchema),
    defaultValues: {
      title: (propiedad) ? propiedad.title : "",
      description: propiedad ? propiedad.description : "",
      linkFacebook: propiedad ? propiedad.linkFacebook : "",
      imagenes: [],
      estaVendida: false,
    },
  });

  const handlePropiedadSubmit = async (data: z.infer<typeof propiedadSchema>) => {
      if (!files || files.length === 0) {
        toast.error("Debes seleccionar al menos una imagen para subir");
        return;
      }
      
      if (!propiedad) {        
        try {
          // PASO 1: Subir las imágenes a Cloudinary PRIMERO
          console.log("📤 Subiendo imágenes a Cloudinary...");
          const formUploadImages = new FormData();
          files.forEach(file => {
            formUploadImages.append("file", file);
          });
          formUploadImages.append('id', data.title);
          
          const uploadRes = await fetch('/api/upload', {
            method: "POST",
            body: formUploadImages,
          });
          
          if (!uploadRes.ok) {
            throw new Error("Error al subir las imágenes a Cloudinary");
          }
          
          const uploadResult = await uploadRes.json();
          console.log("✅ Imágenes subidas a Cloudinary:", uploadResult.urls);
          
          if (!uploadResult.urls || uploadResult.urls.length === 0) {
            throw new Error("No se recibieron URLs de Cloudinary");
          }

          // PASO 2: Crear la propiedad con las URLs de Cloudinary
          console.log("📝 Creando propiedad con URLs de Cloudinary...");
          const formData = new FormData();
          
          // Usar las URLs de Cloudinary, no los nombres de archivo
          uploadResult.urls.forEach(url => {
            formData.append("imagenes", url);
          });
          
          formData.append("title", data.title);
          formData.append("description", data.description);
          formData.append("linkFacebook", data.linkFacebook || "");
          formData.append("estaVendida", data.estaVendida.toString());
          
          const res = await fetch("/api/propiedades", {
            method: "POST",
            body: formData,
          });
          
          if (!res.ok) {
            throw new Error("Error al crear la propiedad en la base de datos");
          }
          
          const result = await res.json();
          console.log("✅ Propiedad creada exitosamente:", result);
          
          toast.success("Propiedad creada exitosamente!");
          form.reset();
          setFiles([]);
          
        } catch (error) {
          console.error('❌ Error:', error);
          toast.error(error.message);
        }
      } else {
        // LÓGICA DE EDICIÓN
        try {
          // Crear FormData para los datos del formulario (edición)
          const formData = new FormData();
          files.forEach(file => {
            formData.append("imagenes", file.name);
          });
          formData.append("title", data.title);
          formData.append("description", data.description);
          formData.append("linkFacebook", data.linkFacebook || "");
          formData.append("estaVendida", data.estaVendida.toString());
          
          // Enviar datos del formulario
          const res = await fetch(`/api/propiedades/${propiedad.id}`, {
            method: "PATCH",
            body: formData,
          });

          if (res.status == 401) throw new Error("Debes ingresar al menos una foto");
          
          if (!res.ok) {
            throw new Error("Algo salió mal al editar la propiedad.");
          }
          
          // Manejo de la respuesta de la edicion de la propiedad
          const result = await res.json();
          console.log("Propiedad editada:", result);
          
          // Solo si hay archivos seleccionados
          if (files.length > 0) {
            
            const formUploadImages = new FormData();
            files.forEach(file => {
              formUploadImages.append("file", file);
            });
            formUploadImages.append("id", data.title)
            
            // Enviar archivos
            const uploadRes = await fetch('/api/upload', {
              method: "POST",
              body: formUploadImages,
            });
            
            if (!uploadRes.ok) {
              throw new Error("Algo salió mal al subir los archivos al modificar la publicación.");
            }
            
            // Manejo de la respuesta de la subida de archivos
            const uploadResult = await uploadRes.json();
            console.log("Archivos subidos:", uploadResult);
            
            // Actualizar la propiedad con las URLs de Cloudinary
            if (uploadResult.urls && uploadResult.urls.length > 0) {
              const updateFormData = new FormData();
              updateFormData.append("imagenes", JSON.stringify(uploadResult.urls));
              
              const updateRes = await fetch(`/api/propiedades/${propiedad.id}`, {
                method: "PATCH",
                body: updateFormData,
              });
              
              if (!updateRes.ok) {
                throw new Error("Error al actualizar la propiedad con las URLs de las imágenes.");
              }
            }
          }
            
          toast.success("Propiedad modificada exitosamente!");
          
        } catch (error) {
          console.error('Error:', error);
          toast.error(error.message);
        }
      }
    };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handlePropiedadSubmit)}  
        className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input placeholder="Propiedad..." {...field} />
              </FormControl>
              <FormDescription>Ingresa el título de la propiedad.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
              <Textarea
                  placeholder="Escribe una descripción"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>Ingresa una descripción detallada de la propiedad.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="linkFacebook"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Link de Facebook</FormLabel>
              <FormControl>
                <Input placeholder="https//www.facebook.com/123..." {...field} />
              </FormControl>
              <FormDescription>Ingresa el link de Facebook de la propiedad.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imagenes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Imágenes</FormLabel>
              <FormControl>
                <Input type="file" multiple onChange={e => {
                  if (e.target.files) {
                    // Convertir los archivos seleccionados a un array
                    const selectedFiles = Array.from(e.target.files);
                    // Actualizar el estado agregando los nuevos archivos a los existentes
                    setFiles([...selectedFiles]);
                  }
                }} />
              </FormControl>
              <FormDescription>Ingresa las imágenes de la propiedad.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="estaVendida"
          render={({ field }) => (
            <FormItem>
              <FormLabel>¿Está vendida?</FormLabel>
              <FormControl>
                <input
                  type="checkbox"
                  name={field.name}
                  checked={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  ref={field.ref}
                />
              </FormControl>
              <FormDescription>Indica si la propiedad está vendida.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">{propiedad ? "Modificar" : "Crear"}</Button>
      </form>
    </Form>
  )
}