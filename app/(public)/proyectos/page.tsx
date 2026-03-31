"use client";

import Link from "next/link";
import { getProjects } from "@/lib/data";
import { ExternalLink, ArrowRight, Calendar, Building2 } from "lucide-react";
import { useState } from "react";

const monthNames = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

function formatDate(dateString: string) {
  const [year, month] = dateString.split("-");
  return `${monthNames[parseInt(month) - 1]} ${year}`;
}

const statusConfig: Record<string, { label: string; dot: string; badge: string }> = {
  activo: {
    label: "Activo",
    dot: "bg-emerald-500",
    badge: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
  },
  autonomo: {
    label: "Autónomo",
    dot: "bg-accent-blue",
    badge: "bg-accent-blue/10 text-accent-blue border border-accent-blue/20",
  },
  cementerio: {
    label: "Cementerio",
    dot: "bg-zinc-500",
    badge: "bg-zinc-800/60 text-zinc-400 border border-zinc-700/40",
  },
};

const filterOptions = [
  { value: "all", label: "Todos" },
  { value: "activo", label: "🟢 Activo" },
  { value: "autonomo", label: "🔵 Autónomo" },
  { value: "cementerio", label: "💀 Cementerio" },
];

export default function ProyectosPage() {
  const allProjects = getProjects().sort(
    (a, b) => new Date(b.launchDate).getTime() - new Date(a.launchDate).getTime()
  );
  const [activeFilter, setActiveFilter] = useState("all");

  const projects =
    activeFilter === "all" ? allProjects : allProjects.filter((p) => p.status === activeFilter);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-16 sm:py-24 border-b border-border/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Mis <span className="text-accent-blue">Proyectos</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              Una línea de tiempo cronológica con los proyectos y productos que he diseñado, programado y lanzado a lo largo de mi carrera profesional.
            </p>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {filterOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setActiveFilter(opt.value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeFilter === opt.value
                      ? "bg-accent-blue text-white shadow-md shadow-accent-blue/20"
                      : "bg-border/20 text-muted-foreground hover:bg-border/40 hover:text-foreground"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 sm:py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Vertical Line */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-border to-transparent -translate-x-1/2"></div>

          <div className="max-w-4xl mx-auto space-y-12 sm:space-y-24">
            {projects.length === 0 ? (
              <div className="text-center py-24 text-muted-foreground">
                No hay proyectos en esta categoría todavía.
              </div>
            ) : (
              projects.map((project, index) => {
                const status = statusConfig[project.status] || statusConfig["activo"];

                return (
                  <div
                    key={project.id}
                    className={`relative flex flex-col sm:flex-row items-center gap-8 sm:gap-0 ${
                      index % 2 === 0 ? "sm:flex-row-reverse" : ""
                    }`}
                  >
                    {/* Timeline Dot */}
                    <div className="absolute left-0 sm:left-1/2 w-6 h-6 rounded-full bg-accent-blue border-4 border-background transform -translate-x-1/2 z-10 shadow-[0_0_15px_rgba(74,144,164,0.5)]"></div>

                    {/* Content Card */}
                    <div className={`w-full pl-8 sm:pl-0 sm:w-1/2 ${index % 2 === 0 ? "sm:pl-12" : "sm:pr-12"}`}>
                      <div className="p-6 sm:p-8 rounded-2xl bg-background border border-border hover:border-accent-blue/50 transition-colors duration-300 shadow-sm group">

                        {/* Date */}
                        <div className="flex items-center gap-2 mb-5 text-xs font-semibold text-accent-silver tracking-wider uppercase">
                          <Calendar size={14} className="text-accent-blue" />
                          Lanzado en {formatDate(project.launchDate)}
                        </div>

                        {/* App Icon + Title + Badge */}
                        <div className="flex items-center gap-4 mb-5">
                          {/* iOS-style app icon */}
                          <div
                            className="w-16 h-16 rounded-[18px] flex items-center justify-center text-3xl flex-shrink-0 shadow-md group-hover:scale-105 transition-transform duration-300"
                            style={{ backgroundColor: project.iconBg || "#1a1a2e" }}
                          >
                            {project.icon}
                          </div>

                          <div className="flex-1 min-w-0">
                            <h3 className="text-xl font-bold text-foreground group-hover:text-accent-blue transition-colors duration-200 leading-tight mb-1">
                              {project.title}
                            </h3>
                            {project.company && (
                              <p className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
                                <Building2 size={12} className="text-accent-silver shrink-0" />
                                {project.company}
                              </p>
                            )}
                            {/* Status Badge */}
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold rounded-full ${status.badge}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                              {status.label}
                            </span>
                          </div>
                        </div>

                        <p className="text-muted-foreground leading-relaxed mb-6 line-clamp-3">
                          {project.description}
                        </p>

                        <div className="pt-4 border-t border-border/40">
                          {project.isExternal && project.link ? (
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-sm font-semibold text-accent-blue hover:text-accent-blue/80 transition-colors group/link"
                            >
                              Ver Proyecto Oficial
                              <ExternalLink size={16} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                            </a>
                          ) : (
                            <Link
                              href={`/proyectos/${project.slug}`}
                              className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-accent-blue transition-colors group/link"
                            >
                              Ver historia y detalles
                              <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                            </Link>
                          )}
                        </div>

                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
