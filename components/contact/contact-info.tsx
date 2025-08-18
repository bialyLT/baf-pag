"use client";

import { MapPin, Phone, Mail, Clock, MessageCircle, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const contactMethods = [
  {
    icon: Phone,
    title: "Teléfono Principal",
    info: "+54 376 4657890",
    description: "Línea directa para consultas",
    action: "tel:+5493764657098",
    actionText: "Llamar ahora",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    info: "+54 9 3764 657098",
    description: "Respuesta rápida",
    action: "https://wa.me/5493764657098",
    actionText: "Escribir",
    popular: true,
  },
];

const scheduleInfo = [
  {
    day: "Lunes a Viernes",
    hours: "9:00 - 18:00",
    note: "Horario comercial",
  },
  {
    day: "Sábados",
    hours: "9:00 - 13:00",
    note: "Solo con cita previa",
  },
  {
    day: "Domingos",
    hours: "Cerrado",
    note: "Emergencias por WhatsApp",
  },
];

export function ContactInfo() {
  return (
    <div className="space-y-6">
      {/* Office Location */}
      <Card className="border-border/50">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">Oficina Principal</CardTitle>
              <p className="text-sm text-muted-foreground">Visitanos en nuestro local</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            <p className="text-sm font-medium">
              Av. Corrientes 1234, Piso 2° Of. 5<br />
              Posadas, Misiones (3300)
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="text-xs">
                <Calendar className="w-3 h-3 mr-1" />
                Lun - Vie 9:00-18:00
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Methods */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-lg">Canales de contacto</CardTitle>
          <p className="text-sm text-muted-foreground">
            Elige el medio que prefieras para contactarte
          </p>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-4">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg border border-border/50 hover:border-border transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-sm">{method.title}</p>
                        {method.popular && (
                          <Badge variant="secondary" className="text-xs px-2 py-0">
                            Popular
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm font-mono">{method.info}</p>
                      <p className="text-xs text-muted-foreground">{method.description}</p>
                    </div>
                  </div>
                  <a
                    href={method.action}
                    target={method.action.startsWith('http') ? '_blank' : undefined}
                    rel={method.action.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="shrink-0"
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                    >
                      {method.actionText}
                    </Button>
                  </a>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Schedule */}
      <Card className="border-border/50">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">Horarios de atención</CardTitle>
              <p className="text-sm text-muted-foreground">
                Planifica tu visita
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            {scheduleInfo.map((schedule, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2 px-3 rounded-lg bg-muted/30"
              >
                <div>
                  <p className="font-medium text-sm">{schedule.day}</p>
                  <p className="text-xs text-muted-foreground">{schedule.note}</p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-sm font-medium">{schedule.hours}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>💡 Tip:</strong> Para citas fuera del horario comercial, contactanos por WhatsApp y coordinaremos un encuentro.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
