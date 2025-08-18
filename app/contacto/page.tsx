import { Metadata } from "next";
import { NavMobile } from "@/components/layout/mobile-nav";
import { Navbar } from "@/components/layout/navbar";
import { SiteFooter } from "@/components/layout/site-footer";
import { ContactHero } from "@/components/contact/contact-hero";
import { ContactForm } from "@/components/contact/contact-form";
import { ContactInfo } from "@/components/contact/contact-info";
import { ContactMap } from "@/components/contact/contact-map";
import { ContactCTA } from "@/components/contact/contact-cta";
import { getAllPropiedades } from "@/lib/propiedades";
import { generateSEOMetadata } from "@/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "Contacto",
  description: "Contáctanos para encontrar la propiedad perfecta. Estamos disponibles para asesorarte en tu búsqueda inmobiliaria en Posadas, Misiones.",
  keywords: [
    "contacto inmobiliaria",
    "asesoría inmobiliaria",
    "agentes inmobiliarios",
    "consulta propiedades",
    "servicio al cliente"
  ],
  section: "Contacto"
});

export default async function ContactoPage() {
  const propiedades = await getAllPropiedades();

  return (
    <div className="min-h-screen bg-background">
      <NavMobile />
      <Navbar propiedades={propiedades} />
      
      <main className="flex-1">
        {/* Hero Section */}
        <ContactHero />
        
        {/* Main Content */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              {/* Left Column - Form */}
              <div className="lg:col-span-2 space-y-8">
                <ContactForm />
                <ContactMap />
              </div>
              
              {/* Right Column - Info & CTA */}
              <div className="lg:col-span-1 space-y-8">
                <ContactInfo />
                <div className="lg:hidden">
                  <ContactCTA />
                </div>
              </div>
            </div>
            
            {/* CTA Section - Desktop */}
            <div className="hidden lg:block mt-16 lg:mt-24">
              <ContactCTA />
            </div>
          </div>
        </section>
      </main>
      
      <SiteFooter />
    </div>
  );
}