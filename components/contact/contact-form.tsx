"use client";

import { useState } from "react";
import { Send, Loader2, CheckCircle, Copy, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  newsletter: boolean;
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    newsletter: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  // Función para copiar datos de contacto al portapapeles
  const copyContactInfo = async () => {
    const contactInfo = `Email: bafbienesraices@gmail.com
Teléfono: +54 376 4567890
WhatsApp: +54 9 376 1234567

Mensaje del formulario:
------------------------
Nombre: ${formData.name}
Email: ${formData.email}
Teléfono: ${formData.phone || 'No proporcionado'}
Motivo: ${formData.subject}
Mensaje: ${formData.message}`;

    try {
      await navigator.clipboard.writeText(contactInfo);
      toast({
        title: "¡Copiado!",
        description: "La información de contacto se ha copiado al portapapeles.",
      });
    } catch (err) {
      toast({
        title: "Error al copiar",
        description: "No se pudo copiar automáticamente. Usa Ctrl+C manualmente.",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validar campos requeridos
      if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        toast({
          title: "Campos incompletos",
          description: "Por favor completa todos los campos obligatorios.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      // Validar email básico
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        toast({
          title: "Email inválido",
          description: "Por favor ingresa un email válido.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      // Crear el contenido del email
      const subject = `Nueva consulta de ${formData.name} - ${formData.subject}`;
      const body = `Estimados,

He completado el formulario de contacto en su sitio web y me gustaría realizar la siguiente consulta:

═══════════════════════════════════════
DATOS DEL CONTACTO
═══════════════════════════════════════
👤 Nombre: ${formData.name}
✉️  Email: ${formData.email}
📞 Teléfono: ${formData.phone || 'No proporcionado'}
🏠 Motivo de consulta: ${formData.subject}

═══════════════════════════════════════
MENSAJE
═══════════════════════════════════════
${formData.message}

${formData.newsletter ? '📧 Deseo recibir notificaciones sobre nuevas propiedades disponibles.\n' : ''}
───────────────────────────────────────
Formulario enviado desde: www.bafbienesraices.com
Fecha: ${new Date().toLocaleDateString('es-AR')} - ${new Date().toLocaleTimeString('es-AR')}

Quedo a la espera de su respuesta.

Saludos cordiales,
${formData.name}`;

      // Crear el enlace mailto
      const mailtoLink = `mailto:bafbienesraices@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      // Abrir el cliente de correo
      window.location.href = mailtoLink;
      
      // Mostrar mensaje de éxito
      setIsSubmitted(true);
      toast({
        title: "¡Abriendo cliente de correo!",
        description: "Se ha abierto tu cliente de correo con el mensaje preparado.",
      });
    } catch (error) {
      toast({
        title: "Error al abrir el correo",
        description: "Inténtalo nuevamente o contáctanos directamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <Card className="border-green-200 bg-green-50/50 dark:bg-green-900/10 dark:border-green-800">
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-xl font-semibold text-green-900 dark:text-green-100 mb-2">
            ¡Cliente de correo abierto!
          </h3>
          <p className="text-green-700 dark:text-green-300 mb-6">
            Se ha abierto tu aplicación de correo con el mensaje preparado. Solo envíalo para completar tu consulta.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
            <Button
              variant="outline"
              onClick={copyContactInfo}
              className="flex-1 border-green-200 text-green-700 hover:bg-green-100 dark:border-green-700 dark:text-green-300 dark:hover:bg-green-900/20"
            >
              <Copy className="w-4 h-4 mr-2" />
              Copiar info
            </Button>
            
            <Button
              variant="outline"
              onClick={() => {
                window.open(`mailto:bafbienesraices@gmail.com`, '_blank');
              }}
              className="flex-1 border-green-200 text-green-700 hover:bg-green-100 dark:border-green-700 dark:text-green-300 dark:hover:bg-green-900/20"
            >
              <Mail className="w-4 h-4 mr-2" />
              Abrir email
            </Button>
          </div>
          
          <Button
            variant="ghost"
            onClick={() => {
              setIsSubmitted(false);
              setFormData({
                name: "",
                email: "",
                phone: "",
                subject: "",
                message: "",
                newsletter: false,
              });
            }}
            className="mt-4 text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-200"
          >
            Enviar otro mensaje
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border/50 shadow-lg">
      <CardHeader className="space-y-4">
        <div>
          <CardTitle className="text-2xl">Envíanos un mensaje</CardTitle>
          <CardDescription className="text-base">
            Completa el formulario y te contactaremos a la brevedad para brindarte la mejor asesoría.
          </CardDescription>
        </div>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Nombre completo *
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Tu nombre"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
                className="h-11"
              />
            </div>
          </div>

          {/* Phone & Subject */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium">
                Teléfono
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+54 9 376 xxxxxxx"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject" className="text-sm font-medium">
                Motivo de consulta *
              </Label>
              <Select
                value={formData.subject}
                onValueChange={(value) => handleInputChange("subject", value)}
                required
              >
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Selecciona un motivo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="comprar">Quiero comprar</SelectItem>
                  <SelectItem value="vender">Quiero vender</SelectItem>
                  <SelectItem value="tasar">Tasación de propiedad</SelectItem>
                  <SelectItem value="consulta">Consulta general</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message" className="text-sm font-medium">
              Mensaje *
            </Label>
            <Textarea
              id="message"
              placeholder="Cuéntanos más detalles sobre lo que buscas..."
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              required
              rows={5}
              className="resize-none"
            />
          </div>

          {/* Newsletter */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="newsletter"
              checked={formData.newsletter}
              onCheckedChange={(checked) => handleInputChange("newsletter", checked as boolean)}
            />
            <Label htmlFor="newsletter" className="text-sm text-muted-foreground cursor-pointer">
              Quiero recibir notificaciones sobre nuevas propiedades
            </Label>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full h-12 text-base font-medium"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Enviando mensaje...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Enviar mensaje
              </>
            )}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            Al enviar este formulario, aceptas que procesemos tu información de acuerdo a nuestra política de privacidad.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
