import { Metadata } from "next";
import { getProfile, getExperiences, getSkills } from "@/lib/data";
import { 
  Github, Linkedin, Instagram, Youtube, Mail, 
  Code, Lightbulb, Briefcase,
  Briefcase as WorkIcon, GraduationCap, Heart, Calendar,
  Star
} from "lucide-react";

export const metadata: Metadata = {
  title: "Sobre mí | Jesús Barros",
  description: "Conoce más sobre Jesús Barros - Ingeniero de Sistemas y Empresario",
};

const socialIcons = {
  linkedin: Linkedin,
  github: Github,
  instagram: Instagram,
  youtube: Youtube,
};

const typeIcons = {
  work: WorkIcon,
  education: GraduationCap,
  volunteer: Heart,
};

const typeLabels = {
  work: "Experiencia Laboral",
  education: "Educación",
  volunteer: "Voluntariado",
};

const categoryIcons: Record<string, React.ElementType> = {
  Frontend: Code,
  Backend: Code,
  Database: Code,
  Tools: Code,
  Cloud: Code,
  "Soft Skills": Briefcase,
};

const categoryColors: Record<string, string> = {
  Frontend: "text-accent-blue",
  Backend: "text-accent-silver",
  Database: "text-accent-blue",
  Tools: "text-accent-silver",
  Cloud: "text-accent-blue",
  "Soft Skills": "text-accent-silver",
};

const categoryBgColors: Record<string, string> = {
  Frontend: "bg-accent-blue/10",
  Backend: "bg-accent-silver/10",
  Database: "bg-accent-blue/10",
  Tools: "bg-accent-silver/10",
  Cloud: "bg-accent-blue/10",
  "Soft Skills": "bg-accent-silver/10",
};

function formatDate(dateString: string | null): string {
  if (!dateString) return "Presente";
  const date = new Date(dateString);
  return date.toLocaleDateString("es-ES", { month: "short", year: "numeric" });
}

function SkillLevel({ level }: { level: number }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={14}
          className={star <= level ? "text-accent-blue fill-accent-blue" : "text-border"}
        />
      ))}
    </div>
  );
}

export default function SobreMiPage() {
  const profile = getProfile();
  const experiences = getExperiences();
  const skills = getSkills();
  
  const groupedExperiences = experiences.reduce((acc, exp) => {
    if (!acc[exp.type]) acc[exp.type] = [];
    acc[exp.type].push(exp);
    return acc;
  }, {} as Record<string, typeof experiences>);

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  const typeOrder: ("work" | "education" | "volunteer")[] = ["work", "education", "volunteer"];
  const skillCategories = Object.keys(groupedSkills);

  return (
    <div className="min-h-screen bg-background">
      {/* Header - Hero Section */}
      <section className="py-16 sm:py-24 border-b border-border/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            {/* Avatar */}
            <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-accent-blue to-accent-silver flex items-center justify-center">
              <span className="text-4xl font-bold text-background">
                {profile.name.split(" ").map(n => n[0]).join("")}
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              {profile.name}
            </h1>
            <p className="text-xl text-accent-silver mb-6">
              {profile.tagline}
            </p>
            
            {/* Social Links */}
            <div className="flex justify-center gap-4 mb-8">
              {Object.entries(profile.socialLinks).map(([key, url]) => {
                const Icon = socialIcons[key as keyof typeof socialIcons];
                return (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-border/20 rounded-full text-muted-foreground hover:text-accent-blue hover:bg-accent-blue/10 transition-all duration-200"
                    aria-label={key}
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
              <a
                href={`mailto:${profile.email}`}
                className="p-3 bg-border/20 rounded-full text-muted-foreground hover:text-accent-blue hover:bg-accent-blue/10 transition-all duration-200"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Bio */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-6">Sobre mí</h2>
            <div className="prose prose-invert max-w-none">
              {profile.bio.split("\n\n").map((paragraph, index) => (
                <p key={index} className="text-muted-foreground leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Areas of Expertise */}
      <section className="py-16 border-t border-border/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
              Áreas de Expertise
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-background border border-border rounded-xl text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent-blue/10 flex items-center justify-center">
                  <Code className="w-8 h-8 text-accent-blue" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Ingeniería de Sistemas
                </h3>
                <p className="text-sm text-muted-foreground">
                  Diseño y desarrollo de soluciones tecnológicas robustas y escalables.
                </p>
              </div>
              <div className="p-6 bg-background border border-border rounded-xl text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent-silver/10 flex items-center justify-center">
                  <Briefcase className="w-8 h-8 text-accent-silver" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Emprendimiento
                </h3>
                <p className="text-sm text-muted-foreground">
                  Desarrollo de iniciativas de negocio con visión estratégica y comercial.
                </p>
              </div>
              <div className="p-6 bg-background border border-border rounded-xl text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent-blue/10 flex items-center justify-center">
                  <Lightbulb className="w-8 h-8 text-accent-blue" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Innovación
                </h3>
                <p className="text-sm text-muted-foreground">
                  Integración de tecnología y negocio para crear soluciones de valor.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section - LinkedIn Style */}
      <section className="py-16 border-t border-border/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-8">
              Experiencia
            </h2>
            <div className="space-y-8">
              {typeOrder.map((type) => {
                const typeExperiences = groupedExperiences[type];
                if (!typeExperiences || typeExperiences.length === 0) return null;
                
                const TypeIcon = typeIcons[type];
                
                return (
                  <div key={type}>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-accent-blue/10 rounded-lg">
                        <TypeIcon className="w-5 h-5 text-accent-blue" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground">
                        {typeLabels[type]}
                      </h3>
                    </div>

                    <div className="space-y-6 ml-4 pl-6 border-l-2 border-border">
                      {typeExperiences.map((exp) => (
                        <div key={exp.id} className="pb-6">
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                            <h4 className="text-lg font-semibold text-foreground">
                              {exp.role}
                            </h4>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Calendar size={14} />
                              <span>
                                {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                              </span>
                            </div>
                          </div>
                          <p className="text-accent-silver font-medium mb-2">
                            {exp.company}
                          </p>
                          <p className="text-muted-foreground leading-relaxed">
                            {exp.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section - LinkedIn Style */}
      <section className="py-16 border-t border-border/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-8">
              Habilidades
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {skillCategories.map((category) => {
                const CategoryIcon = categoryIcons[category] || Code;
                const textColor = categoryColors[category] || "text-accent-blue";
                const bgColor = categoryBgColors[category] || "bg-accent-blue/10";
                
                return (
                  <div key={category}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-2 ${bgColor} rounded-lg`}>
                        <CategoryIcon className={`w-4 h-4 ${textColor}`} />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground">
                        {category}
                      </h3>
                    </div>
                    <div className="space-y-3">
                      {groupedSkills[category].map((skill) => (
                        <div
                          key={skill.id}
                          className="flex items-center justify-between p-3 bg-border/5 rounded-lg"
                        >
                          <span className="text-foreground text-sm">
                            {skill.name}
                          </span>
                          <SkillLevel level={skill.level} />
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
