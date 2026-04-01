/* eslint-disable @next/next/no-img-element */
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, getProjects } from "@/lib/data";
import { ChevronLeft, Calendar, Building2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import fs from "fs";
import path from "path";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  const projects = getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const project = getProjectBySlug(params.slug);
  if (!project) {
    return { title: "Proyecto no encontrado | Jesús Barros" };
  }
  return {
    title: `${project.title} | Jesús Barros`,
    description: project.description,
  };
}

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

function processContent(content: string): string {
  return content.replace(/\[VIDEO: (.*?)\]/g, (_match, videoUrl) => {
    return `<div class="relative w-full aspect-video my-8 rounded-xl overflow-hidden shadow-lg border border-white/10"><iframe src="${videoUrl}" width="100%" height="100%" title="Video del proyecto" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen class="absolute inset-0 w-full h-full"></iframe></div>`;
  });
}

export default function ProyectoDetallePage({ params }: Props) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  const status = statusConfig[project.status] || statusConfig["autonomo"];

  let content = "";
  try {
    const mdPath = path.join(process.cwd(), "data", "projects", `${params.slug}.md`);
    if (fs.existsSync(mdPath)) {
      content = fs.readFileSync(mdPath, "utf8");
    }
  } catch (error) {
    console.error("Error al leer el archivo Markdown del proyecto:", error);
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="border-b border-border/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/proyectos"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent-blue transition-colors duration-200"
          >
            <ChevronLeft size={16} />
            Volver a Proyectos
          </Link>
        </div>
      </div>

      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">

            {/* App Icon + Meta */}
            <div className="flex items-start gap-6 mb-8">
              <div
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-[22px] flex items-center justify-center text-4xl sm:text-5xl flex-shrink-0 shadow-xl"
                style={{ backgroundColor: project.iconBg || "#1a1a2e" }}
              >
                {project.icon}
              </div>

              <div className="flex-1 pt-1">
                <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-1">
                  {project.title}
                </h1>
                {project.subtitle && (
                  <p className="text-muted-foreground text-base mb-3">{project.subtitle}</p>
                )}
                <div className="flex flex-wrap items-center gap-3">
                  {/* Status badge */}
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold rounded-full ${status.badge}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                    {status.label}
                  </span>

                  {/* Company */}
                  {project.company && (
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Building2 size={13} className="text-accent-silver" />
                      {project.company}
                    </span>
                  )}

                  {/* Date */}
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Calendar size={13} className="text-accent-blue" />
                    {formatDate(project.launchDate)}
                  </span>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-border/40 mb-10" />


            {/* Content */}
            <article className="prose prose-invert prose-lg max-w-none">
              {content ? (
                <div className="markdown-content">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    components={{
                      h2: ({ children }) => <h2 className="text-2xl font-bold text-foreground mt-10 mb-5">{children}</h2>,
                      h3: ({ children }) => <h3 className="text-xl font-bold text-foreground mt-8 mb-4">{children}</h3>,
                      p: ({ children }) => <p className="text-muted-foreground leading-relaxed mb-6">{children}</p>,
                      a: ({ children, href }) => <a href={href} className="text-accent-blue hover:text-accent-blue/80 underline underline-offset-4 decoration-accent-blue/30" target="_blank" rel="noopener noreferrer">{children}</a>,
                      ul: ({ children }) => <ul className="list-disc list-inside space-y-3 mb-8 text-muted-foreground">{children}</ul>,
                      li: ({ children }) => <li className="ml-4 marker:text-accent-blue">{children}</li>,
                      strong: ({ children }) => <strong className="text-foreground font-semibold">{children}</strong>,
                      blockquote: ({ children }) => <blockquote className="border-l-4 border-accent-blue pl-6 py-2 bg-accent-blue/5 rounded-r-lg italic my-8 text-muted-foreground">{children}</blockquote>,
                      iframe: ({ src, width, height, title, allow, allowFullScreen }) => (
                        <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg border border-border/40 my-10 bg-black/20">
                          <iframe
                            src={src}
                            width={width || "100%"}
                            height={height || "100%"}
                            title={title}
                            allow={allow}
                            allowFullScreen={allowFullScreen}
                            className="absolute inset-0 w-full h-full"
                          />
                        </div>
                      ),
                    }}
                  >
                    {processContent(content)}
                  </ReactMarkdown>
                </div>
              ) : (
                <div className="p-12 text-center border border-dashed border-border rounded-2xl bg-border/5">
                  <p className="text-muted-foreground text-lg">
                    Este proyecto aún no tiene documentación detallada publicada.
                  </p>
                </div>
              )}
            </article>

            {/* External Link CTA */}
            {project.isExternal && project.link && (
              <div className="mt-16 pt-8 border-t border-border/40">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 pl-6 pr-5 py-3.5 bg-accent-blue text-white font-semibold rounded-xl hover:bg-accent-blue/90 shadow-lg hover:shadow-accent-blue/20 transition-all hover:-translate-y-0.5"
                >
                  Visitar sitio web oficial
                  <ChevronLeft size={18} className="rotate-180" />
                </a>
              </div>
            )}

          </div>
        </div>
      </section>
    </div>
  );
}
