"use client";

import { ArrowRight, Star, Users, Award, Handshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Users,
    title: "5+ años",
    description: "de experiencia",
  },
  {
    icon: Handshake,
    title: "100%",
    description: "compromiso total",
  },
];

export function ContactCTA() {
  return (
    <div className="space-y-8">
      {/* Trust Indicators */}
      <div className="grid grid-cols-2 lg:grid-cols-2  gap-4">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Card key={index} className="border-border/50 text-center">
              <CardContent className="pt-6 pb-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-primary mb-1">
                  {feature.title}
                </div>
                <p className="text-xs text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main CTA Card */}
      <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10 overflow-hidden relative">
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
        
        <CardContent className="pt-8 pb-8 relative">
          <div className="text-center space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Star className="w-4 h-4 fill-current" />
                Servicio profesional
              </div>
              
              <h3 className="text-2xl lg:text-3xl font-bold">
                ¿Listo para encontrar tu propiedad ideal?
              </h3>
              
              <p className="text-muted-foreground text-base max-w-2xl mx-auto">
                Nuestro equipo de expertos te acompañará en cada paso del proceso. 
                Desde la búsqueda hasta la escrituración, te brindamos el mejor servicio.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/5493764657098?text=Hola! Quiero información sobre propiedades"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" className="w-full sm:w-auto text-base font-medium">
                  Consultar por WhatsApp
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </a>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full sm:w-auto text-base font-medium"
                onClick={() => {
                  const form = document.getElementById('name');
                  if (form) {
                    form.scrollIntoView({ behavior: 'smooth' });
                    form.focus();
                  }
                }}
              >
                Completar formulario
              </Button>
            </div>

            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground pt-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                Atención personalizada
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                Sin compromiso
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}
