"use client";

import { useState } from "react";
import { MapPin, Navigation, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function ContactMap() {
  const [mapLoaded, setMapLoaded] = useState(false);

  const officeLocation = {
    name: "BAF Bienes Raíces",
    address: "Av. Corrientes 1234, Piso 2° Of. 5, Posadas, Misiones (3300)",
    coordinates: { lat: -27.3621, lng: -55.9006 }, // Posadas coordinates
    googleMapsUrl: "https://maps.app.goo.gl/mQkCrScDRo5GNDuP8",
    wazeUrl: "https://waze.com/ul/hsv8vtgq1s",
  };

  const nearbyLandmarks = [
    { name: "Terminal de Ómnibus", distance: "6km", icon: "🚌" },
    { name: "Costanera", distance: "700m", icon: "🌊" },
    { name: "Shopping Posadas", distance: "500m", icon: "🛍️" },
    { name: "Aeropuerto Libertador", distance: "12km", icon: "✈️" },
  ];

  return (
    <Card className="border-border/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">¿Cómo llegar?</CardTitle>
              <p className="text-sm text-muted-foreground">
                Ubicación y referencias
              </p>
            </div>
          </div>
          <Badge variant="secondary" className="text-xs">
            Centro de Posadas
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0 space-y-6">
        {/* Interactive Map Container */}
        <div className="relative">
          <div 
            className="w-full h-64 rounded-lg overflow-hidden border border-border/50 bg-muted/30 relative group cursor-pointer"
            onClick={() => setMapLoaded(true)}
          >
            {!mapLoaded ? (
              // Map Placeholder
              <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                  <MapPin className="w-8 h-8 text-primary" />
                </div>
                <p className="text-sm font-medium mb-1">Ver mapa interactivo</p>
                <p className="text-xs">Haz clic para cargar el mapa</p>
              </div>
            ) : (
              // Embedded Map (Google Maps)
              <iframe
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3539.812823928584!2d-55.90281492536895!3d-27.362090176321655!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9457be4675ce8b2d%3A0x1e8b5e0e8e8e8e8e!2sPosadas%2C+Misiones%2C+Argentina!5e0!3m2!1sen!2sar!4v1234567890`}
                width="100%"
                height="100%"
                className="border-0"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación de BAF Bienes Raíces"
              />
            )}
            
            {/* Loading overlay */}
            {mapLoaded && (
              <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
              </div>
            )}
          </div>
        </div>

        {/* Address Info */}
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <div className="flex-1">
                <p className="font-medium text-sm">{officeLocation.name}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {officeLocation.address}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a
              href={officeLocation.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
            >
              <Button 
                variant="outline" 
                className="w-full justify-start"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Abrir en Google Maps
              </Button>
            </a>
            <a
              href={officeLocation.wazeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
            >
              <Button 
                variant="outline" 
                className="w-full justify-start"
              >
                <Navigation className="w-4 h-4 mr-2" />
                Abrir en Waze
              </Button>
            </a>
          </div>
        </div>

        {/* Nearby Landmarks */}
        <div>
          <h4 className="font-medium text-sm mb-3">Referencias cercanas</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {nearbyLandmarks.map((landmark, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 rounded-lg bg-muted/20 border border-border/30"
              >
                <span className="text-lg">{landmark.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{landmark.name}</p>
                  <p className="text-xs text-muted-foreground">{landmark.distance}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
