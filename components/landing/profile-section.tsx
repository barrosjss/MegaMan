import Link from "next/link";
import { ArrowRight, Briefcase, GraduationCap, Lightbulb } from "lucide-react";

const highlights = [
  {
    icon: Briefcase,
    title: "Visión Empresarial",
    description: "Experiencia en desarrollo de iniciativas de negocio y emprendimiento tecnológico.",
  },
  {
    icon: GraduationCap,
    title: "Ingeniería de Sistemas",
    description: "Formación sólida en ingeniería con enfoque en soluciones tecnológicas innovadoras.",
  },
  {
    icon: Lightbulb,
    title: "Innovación",
    description: "Creación de soluciones que integran tecnología y estrategia de negocio.",
  },
];

export function ProfileSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-foreground">
              Perfil Profesional
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Como Ingeniero de Sistemas y Empresario, combino la visión técnica con 
              la estrategia de negocio. Mi enfoque integra la precisión del ingeniero 
              con la visión del emprendedor.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Me apasiona crear soluciones tecnológicas que generen valor real, 
              abordando proyectos desde la concepción técnica hasta la viabilidad comercial.
            </p>
            <Link
              href="/sobre-mi"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent-silver/10 text-accent-silver font-medium rounded-lg hover:bg-accent-silver/20 transition-colors duration-200"
            >
              Sobre mí
              <ArrowRight size={18} />
            </Link>
          </div>

          {/* Highlights */}
          <div className="space-y-6">
            {highlights.map((item, index) => (
              <div
                key={index}
                className="flex gap-4 p-6 bg-background border border-border rounded-xl hover:border-accent-silver/30 transition-colors duration-200"
              >
                <div className="flex-shrink-0">
                  <div className="p-3 bg-accent-silver/10 rounded-lg">
                    <item.icon className="w-6 h-6 text-accent-silver" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
