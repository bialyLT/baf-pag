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
      // Crear FormData para los datos del formulario
      const formData = new FormData();
      if (!files) return;
      files.forEach(file => {
        formData.append("imagenes", file.name);
      });
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("linkFacebook", data.linkFacebook || "");
      formData.append("estaVendida", data.estaVendida.toString());
      
      if (!propiedad) {        
        try {
          // Enviar datos del formulario
          const res = await fetch("/api/propiedades", {
            method: "POST",
            body: formData,
          });
          
          if (!res.ok) {
            throw new Error("Algo salió mal al crear la propiedad.");
          }
          
          // Manejo de la respuesta de la creación de la propiedad
          const result = await res.json();
          console.log("Propiedad creada:", result);
          
          // Solo si hay archivos seleccionados
          const formUploadImages = new FormData();
          files.forEach(file => {
            formUploadImages.append("file", file);
          });
          formUploadImages.append('id', data.title)
          
          // Enviar archivos
          const uploadRes = await fetch('/api/upload', {
            method: "POST",
            body: formUploadImages,
          });
          
          if (!uploadRes.ok) {
            throw new Error("Algo salió mal al subir los archivos al crear la publicación.");
          }

          if (uploadRes.status == 401) throw new Error("Debes seleccionar al menos una imagen para subir");
          
          // Manejo de la respuesta de la subida de archivos
          const uploadResult = await uploadRes.json();
          console.log("Archivos subidos:", uploadResult);
          
          toast.success("Propiedad creada exitosamente!");
          
        } catch (error) {
          console.error('Error:', error);
          toast.error(error.message);
        }
      } else {
        try {
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