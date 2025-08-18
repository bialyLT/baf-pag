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
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string>("");

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
        setIsUploading(true);
        try {
          // PASO 1: Subir las imágenes a Cloudinary en LOTES para evitar límite de 4.5MB
          setUploadProgress("📤 Analizando imágenes...");
          
          // Calcular el tamaño total para diagnosticar
          const totalSize = files.reduce((sum, file) => sum + file.size, 0);
          console.log(`🔍 Total de archivos: ${files.length}`);
          console.log(`🔍 Tamaño total: ${(totalSize / 1024 / 1024).toFixed(2)} MB`);
          
          // Función para calcular el tamaño de un lote MEJORADA
          const getBatchSize = (filesList: File[]) => {
            let currentBatchSize = 0;
            let batchFiles: File[] = [];
            const MAX_BATCH_SIZE = 2.5 * 1024 * 1024; // 2.5MB para más seguridad
            
            for (let i = 0; i < filesList.length; i++) {
              const file = filesList[i];
              
              // Si este archivo solo ya excede el límite, lo ponemos solo
              if (file.size > MAX_BATCH_SIZE) {
                if (batchFiles.length === 0) {
                  console.warn(`⚠️ Archivo muy grande: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)}MB)`);
                  batchFiles.push(file);
                }
                break;
              }
              
              // Si agregar este archivo excede el límite Y ya tenemos archivos
              if (currentBatchSize + file.size > MAX_BATCH_SIZE && batchFiles.length > 0) {
                console.log(`📊 Lote completo: ${batchFiles.length} archivos, ${(currentBatchSize / 1024 / 1024).toFixed(2)}MB`);
                break;
              }
              
              batchFiles.push(file);
              currentBatchSize += file.size;
            }
            
            return batchFiles;
          };
          
          // Pre-calcular todos los lotes para mostrar progreso real
          const allBatches: File[][] = [];
          let remainingForPreview = [...files];
          while (remainingForPreview.length > 0) {
            const batch = getBatchSize(remainingForPreview);
            if (batch.length === 0) break; // Prevenir loop infinito
            allBatches.push(batch);
            remainingForPreview = remainingForPreview.slice(batch.length);
          }
          
          console.log(`📦 Se crearán ${allBatches.length} lotes`);
          allBatches.forEach((batch, i) => {
            const size = batch.reduce((sum, f) => sum + f.size, 0);
            console.log(`   Lote ${i + 1}: ${batch.length} archivos (${(size / 1024 / 1024).toFixed(2)}MB)`);
          });
          
          // Procesar lotes uno por uno
          const allUrls: string[] = [];
          
          for (let i = 0; i < allBatches.length; i++) {
            const batchFiles = allBatches[i];
            const batchNumber = i + 1;
            const batchSize = batchFiles.reduce((sum, f) => sum + f.size, 0);
            
            setUploadProgress(`📦 Subiendo lote ${batchNumber}/${allBatches.length} (${batchFiles.length} imágenes, ${(batchSize / 1024 / 1024).toFixed(1)}MB)`);
            
            try {
              console.log(`\n� INICIANDO LOTE ${batchNumber}:`);
              console.log(`   Archivos: ${batchFiles.map(f => f.name).join(', ')}`);
              
              const formUploadImages = new FormData();
              batchFiles.forEach((file, fileIndex) => {
                formUploadImages.append("file", file);
                console.log(`   📎 Agregado: ${file.name} (${(file.size / 1024).toFixed(0)}KB)`);
              });
              formUploadImages.append('id', data.title);
              formUploadImages.append('isFirstBatch', i === 0 ? 'true' : 'false'); // Indicar si es el primer lote
              
              console.log(`   📤 Enviando lote ${batchNumber} al servidor...`);
              const uploadRes = await fetch('/api/upload', {
                method: "POST",
                body: formUploadImages,
              });
              
              console.log(`   📊 Respuesta del servidor: ${uploadRes.status} ${uploadRes.statusText}`);
              
              if (!uploadRes.ok) {
                const errorText = await uploadRes.text();
                console.error(`❌ Error en lote ${batchNumber}:`, errorText);
                throw new Error(`Error en lote ${batchNumber}: ${uploadRes.status} ${uploadRes.statusText}`);
              }
              
              const uploadResult = await uploadRes.json();
              console.log(`   📊 Resultado lote ${batchNumber}:`, {
                success: uploadResult.success,
                uploaded: uploadResult.uploaded,
                failed: uploadResult.failed,
                urlsCount: uploadResult.urls?.length || 0
              });
              
              if (!uploadResult.success || !uploadResult.urls || uploadResult.urls.length === 0) {
                console.error(`❌ Lote ${batchNumber} falló:`, uploadResult);
                throw new Error(`Lote ${batchNumber} no retornó URLs válidas`);
              }
              
              // Verificar que recibimos las URLs esperadas
              if (uploadResult.urls.length !== batchFiles.length) {
                console.warn(`⚠️ Lote ${batchNumber}: esperaba ${batchFiles.length} URLs, recibí ${uploadResult.urls.length}`);
              }
              
              allUrls.push(...uploadResult.urls);
              console.log(`✅ Lote ${batchNumber} completado. Total URLs acumuladas: ${allUrls.length}`);
              
            } catch (batchError) {
              console.error(`❌ Error crítico en lote ${batchNumber}:`, batchError);
              throw new Error(`Falló el lote ${batchNumber}: ${batchError.message}`);
            }
            
            // Pausa entre lotes para evitar rate limiting
            if (i < allBatches.length - 1) {
              console.log(`   ⏸️ Pausa de 1s antes del siguiente lote...`);
              await new Promise(resolve => setTimeout(resolve, 1000));
            }
          }
          
          // VERIFICACIÓN FINAL
          console.log(`\n🎯 RESUMEN FINAL:`);
          console.log(`   📊 Total archivos originales: ${files.length}`);
          console.log(`   📊 Total lotes procesados: ${allBatches.length}`);
          console.log(`   📊 Total URLs obtenidas: ${allUrls.length}`);
          console.log(`   🔗 URLs finales:`, allUrls);
          
          setUploadProgress(`✅ ${allUrls.length}/${files.length} imágenes subidas. Creando publicación...`);
          
          if (allUrls.length === 0) {
            throw new Error("❌ No se subieron imágenes correctamente - ningún lote retornó URLs");
          }
          
          if (allUrls.length !== files.length) {
            console.warn(`⚠️ ADVERTENCIA: Se esperaban ${files.length} URLs pero se obtuvieron ${allUrls.length}`);
          }

          // PASO 2: Crear la propiedad con todas las URLs de Cloudinary
          console.log("\n📝 CREANDO PROPIEDAD:");
          console.log(`   📊 URLs a guardar: ${allUrls.length}`);
          const formData = new FormData();
          
          // Usar todas las URLs de Cloudinary
          allUrls.forEach((url, index) => {
            console.log(`   🔗 URL ${index + 1}: ${url}`);
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
          
          toast.success(`Propiedad creada exitosamente con ${allUrls.length} imágenes!`);
          form.reset();
          setFiles([]);
          
        } catch (error) {
          console.error('❌ Error:', error);
          toast.error(error.message || "Error al crear la propiedad");
        } finally {
          setIsUploading(false);
          setUploadProgress("");
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
        
        {/* Indicador de progreso */}
        {isUploading && uploadProgress && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
            <p className="text-sm text-blue-700">{uploadProgress}</p>
            <div className="mt-2 w-full bg-blue-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full animate-pulse w-3/5"></div>
            </div>
          </div>
        )}
        
        <Button 
          type="submit" 
          disabled={isUploading}
          className={isUploading ? "opacity-50 cursor-not-allowed" : ""}
        >
          {isUploading 
            ? (propiedad ? "Modificando..." : "Creando...") 
            : (propiedad ? "Modificar" : "Crear")
          }
        </Button>
      </form>
    </Form>
  )
}