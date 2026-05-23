export interface Project {
  id: string;
  title: string;
  category: "Frontend" | "Data" | "Fullstack";
  description: string;
  summary?: string;
  role: string;
  teamSize?: string;
  tags: string[];
  image: string;
  link?: string;
}

export interface ProfileInfo {
  fullName: string;
  title: string;
  subtitle: string;
  bio: string;
  economicsBio: string;
  avatar: string;
  cvUrl?: string;
  github: string;
  gitlab: string;
  linkedin: string;
  email: string;
  phone?: string;
  whatsapp?: string;
}

export interface SkillCategory {
  name: string;
  skills: { name: string; level: number; info?: string }[];
}
