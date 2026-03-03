import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTopicContent, getCourseContent } from "@/lib/data";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { 
  Code, 
  Users, 
  Briefcase, 
  FileText,
  BookOpen, 
  Clock, 
  ChevronLeft
} from "lucide-react";

interface Props {
  params: { topicId: string };
}

export function generateStaticParams() {
  return [
    { topicId: "fundamentos-computacion" },
    { topicId: "terminal-linea-comandos" },
    { topicId: "lp-m1-t1" },
    { topicId: "lp-m1-t2" },
    { topicId: "lp-m1-t3" },
    { topicId: "lp-m1-t4" },
    { topicId: "lp-m2-t5" },
    { topicId: "lp-m2-t6" },
    { topicId: "lp-m2-t7" },
    { topicId: "lp-m2-t8" },
    { topicId: "lp-m3-t9" },
    { topicId: "lp-m3-t10" },
    { topicId: "lp-m3-t11" },
    { topicId: "lp-m3-t12" },
    { topicId: "lp-m4-t13" },
    { topicId: "lp-m4-t14" },
    { topicId: "lp-m4-t15" },
    { topicId: "lp-m4-t16" },
  ];
}

export function generateMetadata({ params }: Props): Metadata {
  const topic = getTopicContent(params.topicId);
  if (!topic) {
    return { title: "Tema no encontrado | Jesús Barros" };
  }
  return {
    title: `${topic.title} | Bitácora`,
    description: `Aprende sobre ${topic.title}`,
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
};

export default function TemaPage({ params }: Props) {
  const { topicId } = params;
  const topic = getTopicContent(topicId);
  
  if (!topic) {
    notFound();
  }

  const course = getCourseContent(topic.courseId);
  
  const config = branchConfig[course?.pathId || ""] || { 
    icon: BookOpen, 
    color: "text-accent-blue", 
    bgColor: "bg-accent-blue/10" 
  };

  // Function to process content and replace video tags with iframe HTML
  const processContent = (content: string): string => {
    // Replace [VIDEO: ...] format with iframe HTML
    return content.replace(/\[VIDEO: (.*?)\]/g, (match, videoUrl) => {
      return `<div class="relative w-full aspect-video my-8">
              <iframe
                src="${videoUrl}"
                width="100%"
                height="100%"
                title="Video de introducción"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                class="absolute inset-0 w-full h-full rounded-lg"
              ></iframe>
            </div>`;
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="border-b border-border/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href={`/bitacora/curso/${topic.courseId}`}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent-blue transition-colors duration-200"
          >
            <ChevronLeft size={16} />
            Volver a {course?.title || "el curso"}
          </Link>
        </div>
      </div>

      {/* Header */}
      <section className="py-12 sm:py-16 border-b border-border/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <span className={`px-3 py-1 text-xs font-medium rounded-full ${config.bgColor} ${config.color}`}>
                Tema {topic.order}
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock size={14} />
                {topic.duration}
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              {topic.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <article className="prose prose-invert prose-lg max-w-none">
              {topic.sections.map((section) => (
                <div key={section.id} className="mb-12">
                  <h2 className="text-3xl font-bold text-foreground pb-4 border-b border-border/30">
                    {section.title}
                  </h2>
                  <div className="markdown-content">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeRaw]}
                      components={{
                        h1: ({ children }) => <h1 className="text-3xl font-bold text-foreground mt-8 mb-4">{children}</h1>,
                        h2: ({ children }) => <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">{children}</h2>,
                        h3: ({ children }) => <h3 className="text-xl font-bold text-foreground mt-6 mb-3">{children}</h3>,
                        h4: ({ children }) => <h4 className="text-lg font-bold text-foreground mt-4 mb-2">{children}</h4>,
                        ul: ({ children }) => <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground">{children}</ul>,
                        ol: ({ children }) => <ol className="list-decimal list-inside space-y-2 mb-4 text-muted-foreground">{children}</ol>,
                        li: ({ children }) => <li className="ml-4">{children}</li>,
                        strong: ({ children }) => <strong className="text-foreground font-semibold">{children}</strong>,
                        code: ({ children, className }) => {
                          const isInline = !className;
                          return isInline ? (
                            <code className="px-1.5 py-0.5 bg-border/30 rounded text-sm font-mono text-accent-blue">{children}</code>
                          ) : (
                            <pre className="bg-border/20 p-4 rounded-lg overflow-x-auto my-6">
                              <code className="text-sm font-mono text-foreground">{children}</code>
                            </pre>
                          );
                        },
                        table: ({ children }) => <table className="w-full border-collapse my-6">{children}</table>,
                        thead: ({ children }) => <thead className="bg-border/20">{children}</thead>,
                        th: ({ children }) => <th className="border border-border px-4 py-2 text-left text-foreground font-semibold">{children}</th>,
                        td: ({ children }) => <td className="border border-border px-4 py-2 text-muted-foreground">{children}</td>,
                        blockquote: ({ children }) => <blockquote className="border-l-4 border-accent-blue pl-4 italic my-4 text-muted-foreground">{children}</blockquote>,
                        a: ({ children, href }) => <a href={href} className="text-accent-blue hover:underline">{children}</a>,
                        iframe: ({ src, width, height, title, allow, allowFullScreen }) => (
                          <div className="relative w-full aspect-video my-8">
                            <iframe
                              src={src}
                              width={width || "100%"}
                              height={height || "100%"}
                              title={title}
                              allow={allow}
                              allowFullScreen={allowFullScreen}
                              className="absolute inset-0 w-full h-full rounded-lg"
                            />
                          </div>
                        ),

                      }}
                    >
                      {processContent(section.content)}
                    </ReactMarkdown>
                  </div>
                </div>
              ))}
            </article>

            {/* Navigation */}
            <div className="mt-16 pt-8 border-t border-border/40">
              <div className="flex items-center justify-between">
                <Link
                  href={`/bitacora/curso/${topic.courseId}`}
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent-blue transition-colors duration-200"
                >
                  <ChevronLeft size={16} />
                  Ver todos los temas
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
