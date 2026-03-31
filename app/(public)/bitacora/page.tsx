import { Metadata } from "next";
import Link from "next/link";
import { getAllLearningPaths } from "@/lib/data";
import { 
  Code, 
  Users, 
  Briefcase, 
  FileText,
  Newspaper,
  BookOpen, 
  Clock, 
  ChevronRight,
  ArrowRight
} from "lucide-react";

export const metadata: Metadata = {
  title: "Bitácora | Jesús Barros",
  description: "Apuntes, notas y recursos de mi proceso de aprendizaje en desarrollo de software, negocios, crecimiento personal, papers, y un registro de noticias e hitos históricos de mi vida.",
};

const branchConfig: Record<string, { icon: React.ElementType; color: string; bgColor: string }> = {
  "software-development": {
    icon: Code,
    color: "text-accent-blue",
    bgColor: "bg-accent-blue/10",
  },
  "personal-growth": {
    icon: Users,
    color: "text-accent-silver",
    bgColor: "bg-accent-silver/10",
  },
  "business": {
    icon: Briefcase,
    color: "text-accent-blue",
    bgColor: "bg-accent-blue/10",
  },
  "papers": {
    icon: FileText,
    color: "text-accent-silver",
    bgColor: "bg-accent-silver/10",
  },
  "noticias-hitos": {
    icon: Newspaper,
    color: "text-accent-blue",
    bgColor: "bg-accent-blue/10",
  },
};



export default function BitacoraPage() {
  const paths = getAllLearningPaths();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-16 sm:py-24 border-b border-border/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Mi <span className="text-accent-blue">Bitácora</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Apuntes, notas y recursos de mi proceso continuo de aprendizaje, así como un registro de noticias e hitos históricos de mi vida. 
              Aquí comparto lo que voy descubriendo en diferentes áreas de interés.
            </p>
          </div>
        </div>
      </section>

      {/* Branches Grid - 4 Main Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {paths.map((path) => {
              const config = branchConfig[path.id] || { 
                icon: BookOpen, 
                color: "text-accent-blue", 
                bgColor: "bg-accent-blue/10" 
              };
              const Icon = config.icon;
              const hasContent = path.courses.length > 0 && path.courses.some(c => c.isPublished);
              
              return (
                <Link
                  key={path.id}
                  href={`/bitacora/rama/${path.id}`}
                  className="group relative p-8 bg-background border border-border rounded-2xl hover:border-accent-blue/50 transition-all duration-300 overflow-hidden"
                >
                  {/* Background gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative space-y-4">
                    {/* Icon & Title */}
                    <div className="flex items-start justify-between">
                      <div className={`p-4 rounded-xl ${config.bgColor}`}>
                        <Icon className={`w-8 h-8 ${config.color}`} />
                      </div>
                      <ArrowRight className={`w-6 h-6 ${config.color} opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200`} />
                    </div>
                    
                    <div>
                      <h2 className="text-2xl font-bold text-foreground mb-2 group-hover:text-accent-blue transition-colors duration-200">
                        {path.title}
                      </h2>
                      <p className="text-muted-foreground leading-relaxed">
                        {path.description}
                      </p>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-4 pt-4 border-t border-border/40">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${config.bgColor} ${config.color}`}>
                        {path.courses.length} {path.courses.length === 1 ? "tema" : "temas"}
                      </span>
                      {hasContent ? (
                        <span className="text-xs text-muted-foreground">
                          {path.courses.filter(c => c.isPublished).length} publicados
                        </span>
                      ) : (
                        <span className="text-xs text-muted-foreground">
                          En desarrollo
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Latest Content Section */}
      <section className="py-16 border-t border-border/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-8">
              Contenido Reciente
            </h2>
            
            {/* Get all published courses from all paths */}
            {(() => {
              const allCourses = paths.flatMap(path => 
                path.courses
                  .filter(course => course.isPublished)
                  .map(course => ({ ...course, pathId: path.id, pathTitle: path.title }))
              ).slice(0, 6);

              if (allCourses.length === 0) {
                return (
                  <div className="p-8 text-center border border-dashed border-border rounded-xl">
                    <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Próximamente nuevo contenido. Estoy trabajando en nuevas entradas para la bitácora.
                    </p>
                  </div>
                );
              }

              return (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {allCourses.map((course) => (
                    <Link
                      key={course.id}
                      href={`/bitacora/${course.id}`}
                      className="group block p-6 bg-background border border-border rounded-xl hover:border-accent-blue/50 transition-all duration-200"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <span className="text-xs font-medium text-accent-silver uppercase tracking-wider">
                          {course.pathTitle}
                        </span>
                        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-accent-blue group-hover:translate-x-1 transition-all duration-200" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-accent-blue transition-colors duration-200">
                        {course.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {course.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <BookOpen size={14} />
                          <span>{course.lessonsCount} entradas</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          <span>{course.duration}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              );
            })()}
          </div>
        </div>
      </section>
    </div>
  );
}
