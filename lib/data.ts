import {
  LearningPath,
  CourseLessons,
  Profile,
  Experience,
  Skill,
  CourseContent,
  CourseTopic,
  TopicContent,
} from "@/types";
import softwareDevelopment from "@/data/bitacora/ramas/software-development.json";
import personalGrowth from "@/data/bitacora/ramas/personal-growth.json";
import business from "@/data/bitacora/ramas/business.json";
import papers from "@/data/bitacora/ramas/papers.json";
import noticiasHitos from "@/data/bitacora/ramas/noticias-hitos.json";

import logicaProgramacionOriginal from "@/data/bitacora/contenido/logica/logica-programacion.json";
import gitCourseContent from "@/data/bitacora/contenido/git/control-versiones-git.json";

// Convert the new format (topics) to legacy format (lessons)
const convertTopicsToLessons = (courseData: CourseContent): CourseLessons => {
  return {
    courseId: courseData.id,
    title: courseData.title,
    lessons: courseData.topics.map((topic: CourseTopic) => ({
      id: topic.id,
      title: topic.title,
      type: "article",
      duration: parseInt(topic.duration) || 90,
      order: topic.order,
      isPublished: topic.isPublished,
      content: topic.description || "",
    })),
  };
};

const logicaProgramacion = convertTopicsToLessons(logicaProgramacionOriginal as CourseContent);
import logicaProgramacionContent from "@/data/bitacora/contenido/logica/logica-programacion.json";
import gitFundamentos from "@/data/bitacora/contenido/git/temas/fundamentos-computacion.json";
import gitTerminal from "@/data/bitacora/contenido/git/temas/terminal-linea-comandos.json";
import lpM1T1 from "@/data/bitacora/contenido/logica/temas/lp-m1-t1.json";
import lpM1T2 from "@/data/bitacora/contenido/logica/temas/lp-m1-t2.json";
import lpM1T3 from "@/data/bitacora/contenido/logica/temas/lp-m1-t3.json";
import lpM1T4 from "@/data/bitacora/contenido/logica/temas/lp-m1-t4.json";
import lpM2T5 from "@/data/bitacora/contenido/logica/temas/lp-m2-t5.json";
import lpM2T6 from "@/data/bitacora/contenido/logica/temas/lp-m2-t6.json";
import lpM2T7 from "@/data/bitacora/contenido/logica/temas/lp-m2-t7.json";
import lpM2T8 from "@/data/bitacora/contenido/logica/temas/lp-m2-t8.json";
import lpM3T9 from "@/data/bitacora/contenido/logica/temas/lp-m3-t9.json";
import lpM3T10 from "@/data/bitacora/contenido/logica/temas/lp-m3-t10.json";
import lpM3T11 from "@/data/bitacora/contenido/logica/temas/lp-m3-t11.json";
import lpM3T12 from "@/data/bitacora/contenido/logica/temas/lp-m3-t12.json";
import lpM4T13 from "@/data/bitacora/contenido/logica/temas/lp-m4-t13.json";
import lpM4T14 from "@/data/bitacora/contenido/logica/temas/lp-m4-t14.json";
import lpM4T15 from "@/data/bitacora/contenido/logica/temas/lp-m4-t15.json";
import lpM4T16 from "@/data/bitacora/contenido/logica/temas/lp-m4-t16.json";
import profileData from "@/data/profile/profile.json";
import experienceData from "@/data/profile/experience.json";
import skillsData from "@/data/profile/skills.json";
import projectsData from "@/data/projects/projects.json";

const learningPaths: LearningPath[] = [
  softwareDevelopment as LearningPath,
  personalGrowth as LearningPath,
  business as LearningPath,
  papers as LearningPath,
  noticiasHitos as LearningPath,
];

// Legacy lessons data (old structure)
const lessonsData: Record<string, CourseLessons> = {
  "logica-programacion": logicaProgramacion as CourseLessons,
};

// Course content data (new modular structure)
const courseContentData: Record<string, CourseContent> = {
  "control-versiones-git": gitCourseContent as CourseContent,
  "logica-programacion": logicaProgramacionContent as CourseContent,
};

const topicContentData: Record<string, TopicContent> = {
  "fundamentos-computacion": gitFundamentos as TopicContent,
  "terminal-linea-comandos": gitTerminal as TopicContent,
  "lp-m1-t1": lpM1T1 as TopicContent,
  "lp-m1-t2": lpM1T2 as TopicContent,
  "lp-m1-t3": lpM1T3 as TopicContent,
  "lp-m1-t4": lpM1T4 as TopicContent,
  "lp-m2-t5": lpM2T5 as TopicContent,
  "lp-m2-t6": lpM2T6 as TopicContent,
  "lp-m2-t7": lpM2T7 as TopicContent,
  "lp-m2-t8": lpM2T8 as TopicContent,
  "lp-m3-t9": lpM3T9 as TopicContent,
  "lp-m3-t10": lpM3T10 as TopicContent,
  "lp-m3-t11": lpM3T11 as TopicContent,
  "lp-m3-t12": lpM3T12 as TopicContent,
  "lp-m4-t13": lpM4T13 as TopicContent,
  "lp-m4-t14": lpM4T14 as TopicContent,
  "lp-m4-t15": lpM4T15 as TopicContent,
  "lp-m4-t16": lpM4T16 as TopicContent,
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

export function getLessonsByCourseId(
  courseId: string,
): CourseLessons | undefined {
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

// Projects data
export function getProjects(): any[] {
  return projectsData.projects;
}

export function getProjectBySlug(slug: string): any | undefined {
  return projectsData.projects.find((p: any) => p.slug === slug);
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
