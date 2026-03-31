import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCourseContent, getLearningPathById } from "@/lib/data";
import { 
  Code, 
  Users, 
  Briefcase, 
  FileText,
  BookOpen, 
  Clock, 
  ChevronLeft,
  ChevronRight,
  PlayCircle,
  Newspaper
} from "lucide-react";

interface Props {
  params: { courseId: string };
}

export function generateStaticParams() {
  return [
    { courseId: "control-versiones-git" },
    { courseId: "logica-programacion" },
  ];
}

export function generateMetadata({ params }: Props): Metadata {
  const course = getCourseContent(params.courseId);
  if (!course) {
    return { title: "Curso no encontrado | Jesús Barros" };
  }
  return {
    title: `${course.title} | Bitácora`,
    description: course.description,
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

export default function CursoPage({ params }: Props) {
  const { courseId } = params;
  const course = getCourseContent(courseId);
  
  if (!course) {
    notFound();
  }

  const path = getLearningPathById(course.pathId);
  const config = branchConfig[course.pathId] || { 
    icon: BookOpen, 
    color: "text-accent-blue", 
    bgColor: "bg-accent-blue/10" 
  };
  const Icon = config.icon;

  const publishedTopics = course.topics.filter(t => t.isPublished);

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="border-b border-border/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href={`/bitacora/rama/${course.pathId}`}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent-blue transition-colors duration-200"
          >
            <ChevronLeft size={16} />
            Volver a {path?.title || "la rama"}
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
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 text-xs font-medium bg-border/20 text-muted-foreground rounded-full">
                  {levelLabels[course.level]}
                </span>
                <span className="px-3 py-1 text-xs font-medium bg-border/20 text-muted-foreground rounded-full">
                  {course.duration}
                </span>
              </div>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              {course.title}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
              {course.description}
            </p>
          </div>
        </div>
      </section>

      {/* Topics List */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-8">
              Temas del Curso
            </h2>
            
            {publishedTopics.length > 0 ? (
              <div className="space-y-4">
                {publishedTopics.map((topic, index) => (
                  <Link
                    key={topic.id}
                    href={`/bitacora/tema/${topic.id}`}
                    className="group flex items-start gap-4 p-6 bg-background border border-border rounded-xl hover:border-accent-blue/50 transition-all duration-200"
                  >
                    {/* Number/Icon */}
                    <div className={`flex-shrink-0 w-12 h-12 rounded-lg ${config.bgColor} flex items-center justify-center`}>
                      <span className={`text-lg font-bold ${config.color}`}>
                        {index + 1}
                      </span>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-accent-blue transition-colors duration-200">
                            {topic.title}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {topic.description}
                          </p>
                        </div>
                        <ChevronRight className="flex-shrink-0 w-5 h-5 text-muted-foreground group-hover:text-accent-blue group-hover:translate-x-1 transition-all duration-200" />
                      </div>
                      
                      <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          <span>{topic.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <PlayCircle size={14} />
                          <span>Contenido completo</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center border border-dashed border-border rounded-xl">
                <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Contenido en desarrollo
                </h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Estoy preparando los temas de este curso. 
                  ¡Vuelve pronto para comenzar a aprender!
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
