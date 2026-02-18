import { LearningPath, CourseLessons, Profile, Experience, Skill, CourseContent, TopicContent } from "@/types";
import softwareDevelopment from "@/data/bitacora/ramas/software-development.json";
import personalGrowth from "@/data/bitacora/ramas/personal-growth.json";
import business from "@/data/bitacora/ramas/business.json";
import papers from "@/data/bitacora/ramas/papers.json";
import logicaProgramacion from "@/data/bitacora/lecciones/logica-programacion.json";
import gitCourseContent from "@/data/bitacora/contenido/git/control-versiones-git.json";
import gitFundamentos from "@/data/bitacora/contenido/git/temas/fundamentos-computacion.json";
import gitTerminal from "@/data/bitacora/contenido/git/temas/terminal-linea-comandos.json";
import profileData from "@/data/profile/profile.json";
import experienceData from "@/data/profile/experience.json";
import skillsData from "@/data/profile/skills.json";

const learningPaths: LearningPath[] = [
  softwareDevelopment as LearningPath,
  personalGrowth as LearningPath,
  business as LearningPath,
  papers as LearningPath,
];

const lessonsData: Record<string, CourseLessons> = {
  "logica-programacion": logicaProgramacion as CourseLessons,
};

// Course content data (new modular structure)
const courseContentData: Record<string, CourseContent> = {
  "control-versiones-git": gitCourseContent as CourseContent,
};

const topicContentData: Record<string, TopicContent> = {
  "fundamentos-computacion": gitFundamentos as TopicContent,
  "terminal-linea-comandos": gitTerminal as TopicContent,
};

export function getAllLearningPaths(): LearningPath[] {
  return learningPaths.filter((path) => path.isPublished);
}

export function getLearningPathById(id: string): LearningPath | undefined {
  return learningPaths.find((path) => path.id === id);
}

export function getCourseBySlug(pathId: string, courseSlug: string) {
  const path = getLearningPathById(pathId);
  if (!path) return undefined;
  return path.courses.find((course) => course.id === courseSlug);
}

export function getLessonsByCourseId(courseId: string): CourseLessons | undefined {
  return lessonsData[courseId];
}

export function getAllCourseSlugs() {
  const slugs: { pathId: string; courseId: string }[] = [];
  learningPaths.forEach((path) => {
    path.courses.forEach((course) => {
      slugs.push({ pathId: path.id, courseId: course.id });
    });
  });
  return slugs;
}

// Profile data
export function getProfile(): Profile {
  return profileData as Profile;
}

// Experience data
export function getExperiences(): Experience[] {
  return experienceData.experiences as Experience[];
}

// Skills data
export function getSkills(): Skill[] {
  return skillsData.skills as Skill[];
}

// Course content functions (new modular structure)
export function getCourseContent(courseId: string): CourseContent | undefined {
  return courseContentData[courseId];
}

export function getTopicContent(topicId: string): TopicContent | undefined {
  return topicContentData[topicId];
}

export function getAllCourseContentIds(): string[] {
  return Object.keys(courseContentData);
}

export function getAllTopicIds(): string[] {
  return Object.keys(topicContentData);
}
