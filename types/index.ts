export interface LearningPath {
  id: string;
  title: string;
  description: string;
  category: 'dev' | 'coaching' | 'personal_growth' | 'business';
  level: 'beginner' | 'intermediate' | 'advanced';
  coverImage: string;
  isPublished: boolean;
  publishedAt: string | null;
  updatedAt: string;
  courses: Course[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  order: number;
  lessonsCount: number;
  duration: string;
  isPublished: boolean;
}

export interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'article' | 'exercise' | 'resource' | 'quiz';
  duration: number;
  order: number;
  isPublished: boolean;
  content: string;
}

export interface CourseLessons {
  courseId: string;
  title: string;
  lessons: Lesson[];
}

export interface Profile {
  name: string;
  tagline: string;
  bio: string;
  location: string;
  photoUrl: string;
  email: string;
  phone: string;
  phone2?: string;
  socialLinks: {
    linkedin: string;
    github: string;
    instagram: string;
    youtube: string;
  };
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string | null;
  description: string;
  type: 'work' | 'education' | 'volunteer';
  location?: string;
  highlights?: string[];
  skills?: string[];
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  level: number;
  icon: string;
}

export interface Certification {
  id: string;
  name: string;
  organization: string;
  year: string;
  url?: string;
}

export interface SkillsData {
  skills: Skill[];
  certifications: Certification[];
}

// New modular content types for Bitacora
export interface CourseTopic {
  id: string;
  title: string;
  order: number;
  duration: string;
  isPublished: boolean;
  description: string;
}

export interface CourseContent {
  id: string;
  pathId: string;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  isPublished: boolean;
  publishedAt: string;
  updatedAt: string;
  topics: CourseTopic[];
}

export interface TopicSection {
  id: string;
  title: string;
  content: string;
}

export interface TopicContent {
  id: string;
  courseId: string;
  title: string;
  order: number;
  duration: string;
  isPublished: boolean;
  sections: TopicSection[];
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  iconBg: string;
  launchDate: string;
  status: string;
  company: string;
  isExternal: boolean;
  link?: string;
}
