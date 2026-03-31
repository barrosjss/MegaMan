import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, getProjects } from "@/lib/data";
import { ChevronLeft, Calendar } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

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

export default function ProyectoDetallePage({ params }: Props) {
  const project = getProjectBySlug(params.slug);
  
  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
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

      <section className="py-12 sm:py-16 border-b border-border/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6 flex-wrap">
              <span className={`px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full ${project.status === 'active' ? 'bg-accent-blue/10 text-accent-blue' : 'bg-border/20 text-muted-foreground'}`}>
                {project.status === 'active' ? 'Activo' : 'Inactivo'}
              </span>
              <span className="flex items-center gap-1.5 text-sm font-medium text-accent-silver">
                <Calendar size={16} className="text-accent-blue" />
                Lanzamiento: {formatDate(project.launchDate)}
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              {project.title}
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed mb-10">
              {project.description}
            </p>
            
            {project.logo && (
              <div className="w-full aspect-[21/9] rounded-2xl overflow-hidden bg-border/20 mb-12 border border-border/40 shadow-lg">
                <img src={project.logo} alt={`Logo de ${project.title}`} className="object-cover w-full h-full" />
              </div>
            )}
            
            <article className="prose prose-invert prose-lg max-w-none">
              {project.content ? (
                <div className="markdown-content">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    components={{
                      h1: ({ children }) => <h1 className="text-3xl font-bold text-foreground mt-12 mb-6">{children}</h1>,
                      h2: ({ children }) => <h2 className="text-2xl font-bold text-foreground mt-10 mb-5">{children}</h2>,
                      h3: ({ children }) => <h3 className="text-xl font-bold text-foreground mt-8 mb-4">{children}</h3>,
                      p: ({ children }) => <p className="text-muted-foreground leading-relaxed mb-6">{children}</p>,
                      a: ({ children, href }) => <a href={href} className="text-accent-blue hover:text-accent-blue/80 underline underline-offset-4 decoration-accent-blue/30" target="_blank" rel="noopener noreferrer">{children}</a>,
                      ul: ({ children }) => <ul className="list-disc list-inside space-y-3 mb-8 text-muted-foreground">{children}</ul>,
                      li: ({ children }) => <li className="ml-4 marker:text-accent-blue">{children}</li>,
                      strong: ({ children }) => <strong className="text-foreground font-semibold">{children}</strong>,
                      blockquote: ({ children }) => <blockquote className="border-l-4 border-accent-blue pl-6 py-2 bg-accent-blue/5 rounded-r-lg italic my-8 text-muted-foreground shadow-sm">{children}</blockquote>,
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
                    {project.content}
                  </ReactMarkdown>
                </div>
              ) : (
                <div className="p-12 text-center border border-dashed border-border rounded-2xl bg-border/5">
                  <p className="text-muted-foreground text-lg">
                    Este proyecto aún no tiene una historia o documentación detallada publicada.
                  </p>
                </div>
              )}
            </article>
            
            {project.isExternal && project.link && (
               <div className="mt-16 pt-8 border-t border-border/40 text-center sm:text-left">
                 <a 
                   href={project.link} 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="inline-flex items-center justify-center gap-2 pl-6 pr-5 py-3.5 bg-accent-blue text-white font-semibold rounded-xl hover:bg-accent-blue/90 shadow-lg hover:shadow-accent-blue/20 transition-all hover:-translate-y-0.5"
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
