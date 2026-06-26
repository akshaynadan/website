export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  category: 'IoT & Mobile' | 'AI & Data' | 'Web Apps';
  image: string;
  githubUrl?: string;
  liveUrl?: string;
  features: string[];
  techStack: string[];
}

export interface Skill {
  name: string;
  level: number; // 0 to 100 representing proficiency or depth
  category: 'Languages & Core' | 'AI, ML & Data' | 'Mobile & IoT' | 'Cloud & Tools';
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string[];
  skills: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  location?: string;
  details: string[];
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string[];
  credentialUrl?: string;
}

export interface AwardItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
}

