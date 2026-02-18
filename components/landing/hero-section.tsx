import Link from "next/link";
import { ArrowRight, Code, Users, Brain } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
                Hola, soy{" "}
                <span className="text-accent-blue">Jesús Barros</span>
              </h1>
              <p className="text-xl sm:text-2xl text-accent-silver font-medium">
                Ingeniero de Sistemas & Empresario
              </p>
            </div>

            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              Apasionado por crear soluciones tecnológicas innovadoras y acompañar 
              personas en su proceso de crecimiento personal y profesional. 
              Combino el mundo del desarrollo con el coaching para ofrecer 
              una perspectiva única en cada proyecto.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/sobre-mi"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent-blue text-white font-medium rounded-lg hover:bg-accent-blue/90 transition-colors duration-200"
              >
                Conóceme
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/bitacora"
                className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground font-medium rounded-lg hover:bg-border/10 transition-colors duration-200"
              >
                Explorar bitácora
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-8 border-t border-border/40">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-accent-blue/10 rounded-lg">
                  <Code className="w-5 h-5 text-accent-blue" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">5+</p>
                  <p className="text-sm text-muted-foreground">Años de experiencia</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-accent-silver/10 rounded-lg">
                  <Users className="w-5 h-5 text-accent-silver" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">100+</p>
                  <p className="text-sm text-muted-foreground">Personas coachadas</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-accent-blue/10 rounded-lg">
                  <Brain className="w-5 h-5 text-accent-blue" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">3</p>
                  <p className="text-sm text-muted-foreground">Áreas de expertise</p>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Element */}
          <div className="relative hidden lg:flex items-center justify-center">
            <div className="relative w-80 h-80">
              {/* Decorative circles */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent-blue/20 to-accent-silver/20 animate-pulse" />
              <div className="absolute inset-4 rounded-full bg-gradient-to-br from-accent-blue/10 to-accent-silver/10" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-2">
                  <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-accent-blue to-accent-silver flex items-center justify-center">
                    <span className="text-4xl font-bold text-background">JB</span>
                  </div>
                </div>
              </div>
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 p-3 bg-background border border-border rounded-xl shadow-lg">
                <Code className="w-6 h-6 text-accent-blue" />
              </div>
              <div className="absolute -bottom-4 -left-4 p-3 bg-background border border-border rounded-xl shadow-lg">
                <Brain className="w-6 h-6 text-accent-silver" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
