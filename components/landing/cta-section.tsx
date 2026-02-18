import Link from "next/link";
import { ArrowRight, Route, User } from "lucide-react";

const ctaLinks = [
  {
    href: "/bitacora",
    title: "Bitácora",
    description: "Apuntes, notas y recursos de mi proceso de aprendizaje.",
    icon: Route,
    color: "blue",
  },
  {
    href: "/sobre-mi",
    title: "Sobre mí",
    description: "Mi historia profesional, experiencia y habilidades.",
    icon: User,
    color: "silver",
  },
];

export function CTASection() {
  return (
    <section className="py-20 bg-background border-t border-border/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Explora las Secciones
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Navega por las diferentes áreas de mi portafolio y descubre contenido 
            diseñado para impulsar tu crecimiento profesional y personal.
          </p>
        </div>

        {/* CTA Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ctaLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative p-8 bg-background border border-border rounded-2xl hover:border-accent-blue/50 transition-all duration-300 overflow-hidden"
            >
              {/* Background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative space-y-4">
                <div className={`p-3 rounded-xl w-fit ${
                  item.color === "blue" 
                    ? "bg-accent-blue/10" 
                    : "bg-accent-silver/10"
                }`}>
                  <item.icon className={`w-6 h-6 ${
                    item.color === "blue" 
                      ? "text-accent-blue" 
                      : "text-accent-silver"
                  }`} />
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-accent-blue transition-colors duration-200">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-sm font-medium text-accent-blue">
                  <span>Explorar</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
