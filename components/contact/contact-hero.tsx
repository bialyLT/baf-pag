import { ArrowRight, MapPin, Phone, Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function ContactHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/10 pt-24 pb-16 lg:pt-32 lg:pb-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-96 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent blur-3xl" />
      </div>

      <div className="container mx-auto px-4 text-center">
        {/* Badge */}
        <Badge variant="outline" className="mb-6 bg-primary/5 border-primary/20">
          <MapPin className="w-3 h-3 mr-1" />
          Posadas, Misiones
        </Badge>

        {/* Heading */}
        <h1 className="text-4xl lg:text-6xl font-heading font-bold tracking-tight mb-6">
          Hablemos de tu{" "}
          <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            hogar ideal
          </span>
        </h1>

        {/* Description */}
        <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
          Nuestro equipo de expertos está listo para ayudarte a encontrar la propiedad perfecta o resolver cualquier consulta inmobiliaria.
        </p>

        {/* Quick Contact Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground">
            <div className="w-2 h-2 bg-blue-500 rounded-full" />
            Lun - Vie 9:00-18:00
          </div>
          <div className="flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground">
            <Phone className="w-4 h-4" />
            Respuesta rápida
          </div>
          <div className="flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground">
            <Mail className="w-4 h-4" />
            5+ años experiencia
          </div>
        </div>
      </div>
    </section>
  );
}
