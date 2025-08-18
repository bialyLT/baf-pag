"use client"

import { propiedadSchema } from "@/lib/validations/propiedad";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner";
import { z } from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState, useCallback } from "react";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { CldImage } from 'next-cloudinary';
import { X, Upload, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function PropiedadCrearForm({propiedad}) {
  const [files, setFiles] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>(
    propiedad?.imagenes || []
  );
  const [deletedImages, setDeletedImages] = useState<string[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string>("");

  // Funciones para manejar imágenes
  const generatePreview = useCallback((file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.readAsDataURL(file);
    });
  }, []);

  const handleFilesChange = useCallback(async (newFiles: FileList | null) => {
    if (!newFiles) return;
    
    const fileArray = Array.from(newFiles);
    setFiles(prev => [...prev, ...fileArray]);
    
    // Generar vistas previas para los nuevos archivos
    const newPreviews = await Promise.all(
      fileArray.map(file => generatePreview(file))
    );
    setImagePreviews(prev => [...prev, ...newPreviews]);
  }, [generatePreview]);

  const removeNewImage = useCallback((index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  }, []);

  const removeExistingImage = useCallback((index: number) => {
    const imageToRemove = existingImages[index];
    setExistingImages(prev => prev.filter((_, i) => i !== index));
    setDeletedImages(prev => [...prev, imageToRemove]);
  }, [existingImages]);

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
      // Validar que haya al menos una imagen (nuevas o existentes)
      const totalImages = files.length + existingImages.length;
      if (totalImages === 0) {
        toast.error("Debes tener al menos una imagen para la propiedad");
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
          setImagePreviews([]);
          
        } catch (error) {
          console.error('❌ Error:', error);
          toast.error(error.message || "Error al crear la propiedad");
        } finally {
          setIsUploading(false);
          setUploadProgress("");
        }
      } else {
        // LÓGICA DE EDICIÓN SIMPLIFICADA
        setIsUploading(true);
        try {
          let allImageUrls = [...existingImages]; // Comenzar con las imágenes existentes
          
          // Paso 1: Si hay nuevas imágenes, subirlas
          if (files.length > 0) {
            setUploadProgress(`📤 Subiendo ${files.length} nuevas imágenes...`);
            
            const formUploadImages = new FormData();
            files.forEach(file => {
              formUploadImages.append("file", file);
            });
            formUploadImages.append("id", data.title);
            formUploadImages.append('isFirstBatch', 'true');

            const uploadRes = await fetch('/api/upload', {
              method: "POST",
              body: formUploadImages,
            });

            if (!uploadRes.ok) {
              throw new Error("Error al subir las nuevas imágenes");
            }

            const uploadResult = await uploadRes.json();
            if (uploadResult.success && uploadResult.urls) {
              allImageUrls = [...allImageUrls, ...uploadResult.urls];
            }
          }

          // Paso 2: Actualizar la propiedad con todos los datos
          setUploadProgress("💾 Guardando cambios...");
          
          const updateFormData = new FormData();
          updateFormData.append("title", data.title);
          updateFormData.append("description", data.description);
          updateFormData.append("linkFacebook", data.linkFacebook || "");
          updateFormData.append("estaVendida", data.estaVendida.toString());
          
          // Enviar todas las imágenes (existentes + nuevas)
          allImageUrls.forEach(url => {
            updateFormData.append("existingImages", url);
          });

          // Enviar las imágenes eliminadas para borrar de Cloudinary
          deletedImages.forEach(url => {
            updateFormData.append("deletedImages", url);
          });

          const res = await fetch(`/api/propiedades/${propiedad.id}`, {
            method: "PATCH",
            body: updateFormData,
          });
          
          if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "Error al actualizar la propiedad");
          }

          const totalImages = allImageUrls.length;
          toast.success(`Propiedad modificada exitosamente! ${totalImages} imágenes totales.`);
          
          // Limpiar estado de nuevas imágenes
          setFiles([]);
          setImagePreviews([]);
          setDeletedImages([]);
          // Actualizar las imágenes existentes con el nuevo estado
          setExistingImages(allImageUrls);
            
        } catch (error) {
          console.error('❌ Error:', error);
          toast.error(error.message || "Error al modificar la propiedad");
        } finally {
          setIsUploading(false);
          setUploadProgress("");
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
              
              {/* Mostrar imágenes existentes solo en modo edición */}
              {propiedad && existingImages.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Imágenes actuales:</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {existingImages.map((imageUrl, index) => (
                      <div key={`existing-${index}`} className="relative group">
                        <CldImage
                          src={imageUrl}
                          alt={`Imagen existente ${index + 1}`}
                          width={150}
                          height={150}
                          className="w-full h-32 object-cover rounded-lg border-2 border-gray-200"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeExistingImage(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Vista previa de nuevas imágenes */}
              {imagePreviews.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    {propiedad ? "Nuevas imágenes a agregar:" : "Vista previa:"}
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {imagePreviews.map((preview, index) => (
                      <div key={`preview-${index}`} className="relative group">
                        <img
                          src={preview}
                          alt={`Vista previa ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg border-2 border-primary/30"
                        />
                        <Button
                          type="button"
                          variant="destructive" 
                          size="sm"
                          className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeNewImage(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                        <div className="absolute bottom-1 left-1 bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded">
                          Nuevo
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Input para seleccionar archivos con estilo mejorado */}
              <FormControl>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 hover:border-muted-foreground/40 transition-colors dark:border-muted-foreground/20 dark:hover:border-muted-foreground/30">
                  <div className="text-center">
                    <Upload className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
                    <div className="mb-2">
                      <label htmlFor="image-upload" className="cursor-pointer">
                        <span className="mt-2 block text-sm font-medium text-foreground">
                          {files.length > 0 
                            ? `${files.length} archivo(s) seleccionado(s)`
                            : "Haz clic para seleccionar imágenes"
                          }
                        </span>
                        <span className="mt-1 block text-xs text-muted-foreground">
                          PNG, JPG, GIF hasta 10MB cada una
                        </span>
                      </label>
                      <Input
                        id="image-upload"
                        type="file"
                        multiple
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFilesChange(e.target.files)}
                      />
                    </div>
                  </div>
                </div>
              </FormControl>
              
              <FormDescription>
                {propiedad 
                  ? "Agrega nuevas imágenes o elimina las existentes. Los cambios se aplicarán al guardar."
                  : "Selecciona las imágenes de la propiedad. Puedes seleccionar múltiples archivos."
                }
              </FormDescription>
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
          <div className="p-4 bg-primary/10 border border-primary/20 rounded-md dark:bg-primary/5 dark:border-primary/10">
            <p className="text-sm text-primary dark:text-primary">{uploadProgress}</p>
            <div className="mt-2 w-full bg-primary/20 rounded-full h-2 dark:bg-primary/10">
              <div className="bg-primary h-2 rounded-full animate-pulse w-3/5"></div>
            </div>
          </div>
        )}
        
        <Button 
          type="submit" 
          disabled={isUploading}
          className={cn("min-w-[120px]", isUploading && "cursor-not-allowed")}
          size="lg"
        >
          {isUploading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
              {propiedad ? "Modificando..." : "Creando..."}
            </div>
          ) : (
            propiedad ? "Modificar propiedad" : "Crear propiedad"
          )}
        </Button>
      </form>
    </Form>
  )
}