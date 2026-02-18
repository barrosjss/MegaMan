import Link from "next/link";
import { ArrowRight, BookOpen, Clock, PlayCircle } from "lucide-react";

const latestLessons = [
  {
    id: "1",
    title: "Introducción a la Lógica de Programación",
    description: "Fundamentos esenciales para comenzar tu carrera en desarrollo de software.",
    duration: "45 min",
    type: "video",
    path: "logica-programacion",
  },
  {
    id: "2",
    title: "Variables y Tipos de Datos en Python",
    description: "Aprende a manejar variables y comprende los diferentes tipos de datos.",
    duration: "30 min",
    type: "article",
    path: "fundamentos-python",
  },
  {
    id: "3",
    title: "Git y Control de Versiones",
    description: "Domina el control de versiones con Git para trabajar en equipo.",
    duration: "60 min",
    type: "video",
    path: "control-versiones-git",
  },
];

const typeIcons = {
  video: PlayCircle,
  article: BookOpen,
};

export function LatestLessonsSection() {
  return (
    <section className="py-20 bg-background border-t border-border/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-12">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Últimas Entradas
            </h2>
            <p className="text-muted-foreground">
              Apuntes y notas recientes de mi bitácora
            </p>
          </div>
          <Link
            href="/bitacora"
            className="inline-flex items-center gap-2 text-accent-blue hover:text-accent-silver transition-colors duration-200"
          >
            Explorar bitácora
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* Lessons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestLessons.map((lesson) => {
            const TypeIcon = typeIcons[lesson.type as keyof typeof typeIcons];
            return (
              <Link
                key={lesson.id}
                href={`/bitacora/${lesson.path}`}
                className="group block p-6 bg-background border border-border rounded-xl hover:border-accent-blue/50 transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2 bg-accent-blue/10 rounded-lg">
                    <TypeIcon className="w-5 h-5 text-accent-blue" />
                  </div>
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">
                    {lesson.type}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-accent-blue transition-colors duration-200">
                  {lesson.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {lesson.description}
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock size={14} />
                  <span>{lesson.duration}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
