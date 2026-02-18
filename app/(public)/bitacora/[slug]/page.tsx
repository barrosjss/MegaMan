import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLearningPathById, getCourseBySlug, getLessonsByCourseId, getAllCourseSlugs } from "@/lib/data";
import { 
  BookOpen, 
  Clock, 
  ChevronLeft, 
  PlayCircle, 
  FileText, 
  Code, 
  Folder, 
  HelpCircle,
  CheckCircle
} from "lucide-react";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  const slugs = getAllCourseSlugs();
  return slugs.map(({ courseId }) => ({ slug: courseId }));
}

export function generateMetadata({ params }: Props): Metadata {
  const { slug } = params;
  
  // Try to find the course in any learning path
  let course = null;
  
  const paths = ["software-development", "personal-growth", "business"];
  for (const pathId of paths) {
    const c = getCourseBySlug(pathId, slug);
    if (c) {
      course = c;
      break;
    }
  }
  
  if (!course) {
    return {
      title: "Curso no encontrado | Jesús Barros",
    };
  }

  return {
    title: `${course.title} | Jesús Barros`,
    description: course.description,
  };
}

const typeIcons = {
  video: PlayCircle,
  article: FileText,
  exercise: Code,
  resource: Folder,
  quiz: HelpCircle,
};

const typeLabels = {
  video: "Video",
  article: "Artículo",
  exercise: "Ejercicio",
  resource: "Recurso",
  quiz: "Quiz",
};

export default function CoursePage({ params }: Props) {
  const { slug } = params;
  
  // Try to find the course in any learning path
  let course = null;
  let learningPath = null;
  
  const paths = ["software-development", "personal-growth", "business"];
  for (const pathId of paths) {
    const p = getLearningPathById(pathId);
    const c = getCourseBySlug(pathId, slug);
    if (c) {
      course = c;
      learningPath = p;
      break;
    }
  }
  
  if (!course || !learningPath) {
    notFound();
  }
  
  const path = learningPath;

  const lessons = getLessonsByCourseId(slug);

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb & Back */}
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

      {/* Course Header */}
      <section className="py-12 sm:py-16 border-b border-border/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-sm font-medium text-accent-silver uppercase tracking-wider">
                {path.title}
              </span>
              <span className="text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">
                Entrada {course.order} de {path.courses.length}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              {course.title}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              {course.description}
            </p>
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <BookOpen size={18} className="text-accent-blue" />
                <span>{course.lessonsCount} lecciones</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-accent-blue" />
                <span>{course.duration} de contenido</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lessons */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h2 className="text-2xl font-bold text-foreground mb-8">
              Contenido
            </h2>
            
            {lessons ? (
              <div className="space-y-4">
                {lessons.lessons.map((lesson, index) => {
                  const TypeIcon = typeIcons[lesson.type];
                  return (
                    <div
                      key={lesson.id}
                      className="group flex items-start gap-4 p-4 sm:p-6 bg-background border border-border rounded-xl hover:border-accent-blue/50 transition-all duration-200"
                    >
                      {/* Lesson Number */}
                      <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-accent-blue/10 text-accent-blue font-semibold text-sm">
                        {index + 1}
                      </div>

                      {/* Icon */}
                      <div className="flex-shrink-0 hidden sm:block">
                        <div className="p-2 bg-border/20 rounded-lg">
                          <TypeIcon className="w-5 h-5 text-muted-foreground" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <h3 className="text-base sm:text-lg font-semibold text-foreground group-hover:text-accent-blue transition-colors duration-200">
                            {lesson.title}
                          </h3>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span className="px-2 py-1 bg-border/20 rounded">
                              {typeLabels[lesson.type]}
                            </span>
                            <span>{lesson.duration} min</span>
                          </div>
                        </div>
                      </div>

                      {/* Status */}
                      <div className="flex-shrink-0">
                        <CheckCircle className="w-5 h-5 text-border" />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-12 text-center border border-dashed border-border rounded-xl">
                <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Contenido en desarrollo
                </h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Las lecciones de este curso están siendo preparadas. 
                  ¡Vuelve pronto para acceder al contenido completo!
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-8 border-t border-border/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {course.order > 1 && (
              <Link
                href={`/bitacora/${path.courses[course.order - 2].id}`}
                className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground font-medium rounded-lg hover:bg-border/10 transition-colors duration-200"
              >
                <ChevronLeft size={18} />
                Curso anterior
              </Link>
            )}
            {course.order < path.courses.length && (
              <Link
                href={`/bitacora/${path.courses[course.order].id}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent-blue text-white font-medium rounded-lg hover:bg-accent-blue/90 transition-colors duration-200 sm:ml-auto"
              >
                Siguiente curso
                <ChevronLeft size={18} className="rotate-180" />
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
