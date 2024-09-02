"use client"

import { z } from "zod"

export const propiedadSchema = z.object({
  title: z.string().min(5, {
    message: "El título debe tener al menos 5 caracteres.",
  }),
  description: z.string().min(10, {
    message: "La descripción debe tener al menos 10 caracteres.",
  }),
  linkFacebook: z.string().url({
    message: "Debe ser una URL válida.",
  }).optional(),
  imagenes: z.any(), 
  estaVendida: z.boolean()
});
