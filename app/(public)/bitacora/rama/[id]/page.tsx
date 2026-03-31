import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLearningPathById, getCourseContent } from "@/lib/data";
import { 
  Code, 
  Users, 
  Briefcase, 
  FileText,
  Newspaper,
  BookOpen, 
  Clock, 
  ChevronLeft,
  ChevronRight
} from "lucide-react";

interface Props {
  params: { id: string };
}

export function generateStaticParams() {
  return [
    { id: "software-development" },
    { id: "personal-growth" },
    { id: "business" },
    { id: "papers" },
    { id: "noticias-hitos" },
  ];
}

export function generateMetadata({ params }: Props): Metadata {
  const path = getLearningPathById(params.id);
  if (!path) {
    return { title: "Rama no encontrada | Jesús Barros" };
  }
  return {
    title: `${path.title} | Bitácora`,
    description: path.description,
  };
}

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

const levelLabels = {
  beginner: "Principiante",
  intermediate: "Intermedio",
  advanced: "Avanzado",
};

export default function RamaPage({ params }: Props) {
  const { id } = params;
  const path = getLearningPathById(id);
  
  if (!path) {
    notFound();
  }

  const config = branchConfig[id] || { 
    icon: BookOpen, 
    color: "text-accent-blue", 
    bgColor: "bg-accent-blue/10" 
  };
  const Icon = config.icon;

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="border-b border-border/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/bitacora"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent-blue transition-colors duration-200"
          >
            <ChevronLeft size={16} />
            Volver a la bitácora
          </Link>
        </div>
      </div>

      {/* Header */}
      <section className="py-16 sm:py-24 border-b border-border/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <div className={`p-4 rounded-xl ${config.bgColor}`}>
                <Icon className={`w-10 h-10 ${config.color}`} />
              </div>
              <span className="px-3 py-1 text-xs font-medium bg-border/20 text-muted-foreground rounded-full">
                {levelLabels[path.level]}
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              {path.title}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
              {path.description}
            </p>
          </div>
        </div>
      </section>

      {/* Topics Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-8">
              Temas
            </h2>
            
            {path.courses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {path.courses.map((course) => {
                  // Check if course has modular content
                  const hasModularContent = getCourseContent(course.id);
                  const courseHref = hasModularContent 
                    ? `/bitacora/curso/${course.id}` 
                    : `/bitacora/${course.id}`;
                  
                  return (
                  <Link
                    key={course.id}
                    href={courseHref}
                    className="group block p-6 bg-background border border-border rounded-xl hover:border-accent-blue/50 transition-all duration-200"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-2 rounded-lg ${config.bgColor}`}>
                        <BookOpen className={`w-5 h-5 ${config.color}`} />
                      </div>
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
                    {!course.isPublished && (
                      <span className="inline-block mt-3 px-2 py-1 text-xs bg-border/20 text-muted-foreground rounded">
                        Próximamente
                      </span>
                    )}
                  </Link>
                  );
                })},
              </div>
            ) : (
              <div className="p-12 text-center border border-dashed border-border rounded-xl">
                <Icon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Contenido en desarrollo
                </h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Estoy preparando nuevo contenido para esta rama. 
                  ¡Vuelve pronto para explorar los nuevos temas!
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
