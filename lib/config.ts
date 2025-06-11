import portfolioConfig from '@/data/portfolio-config.json';

export interface PersonalInfo {
  name: string;
  title: string;
  subtitle: string;
  description: string;
  location: string;
  email: string;
  phone: string;
  profileImage: string;
  cv: string;
  bio: string[];
  socialLinks: {
    github: string;
    linkedin: string;
    email: string;
    twitter?: string;
  };
}

export interface Skill {
  name: string;
  level: number;
}

export interface Skills {
  frontend: Skill[];
  backend: Skill[];
  tools: Skill[];
  database: Skill[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: "web" | "mobile" | "design" | "other";
  image: string;
  tags: string[];
  links: {
    demo?: string;
    github?: string;
  };
  features: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  image?: string;
  isUserSubmitted?: boolean;
  createdAt: string;
}

export interface ContactInfo {
  title: string;
  description: string;
  officeHours: {
    weekdays: string;
    weekdaysTime: string;
    saturday: string;
    saturdayTime: string;
    sunday: string;
    sundayTime: string;
  };
}

export interface SEOInfo {
  title: string;
  description: string;
  keywords: string[];
  author: string;
  siteUrl: string;
  twitterHandle: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface PortfolioConfig {
  personal: PersonalInfo;
  skills: Skills;
  projects: Project[];
  testimonials: Testimonial[];
  contact: ContactInfo;
  seo: SEOInfo;
  navigation: NavItem[];
}

// Export the configuration with proper typing
export const config: PortfolioConfig = portfolioConfig as PortfolioConfig;

// Helper functions to get specific sections
export const getPersonalInfo = (): PersonalInfo => config.personal;
export const getSkills = (): Skills => config.skills;
export const getProjects = (): Project[] => config.projects;
export const getTestimonials = (): Testimonial[] => config.testimonials;
export const getContactInfo = (): ContactInfo => config.contact;
export const getSEOInfo = (): SEOInfo => config.seo;
export const getNavigation = (): NavItem[] => config.navigation;

// Helper functions for specific data
export const getProjectsByCategory = (category: string): Project[] => {
  if (category === "all") return config.projects;
  return config.projects.filter(project => project.category === category);
};

export const getSkillsByCategory = (category: keyof Skills): Skill[] => {
  return config.skills[category];
};

export const getProjectById = (id: string): Project | undefined => {
  return config.projects.find(project => project.id === id);
};