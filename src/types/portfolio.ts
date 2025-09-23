export interface ProjectImage {
  url: string;
  caption?: string;
  altText: string;
  isMain?: boolean; // Mark the primary/thumbnail image
}

export interface Project {
  id: number;
  title: string;
  description: string;
  images: ProjectImage[]; // Changed from single image to array
  category: string;
  technologies: string[];
  highlights: string[];
  metrics: {
    automationSavings: string;
    accuracyImprovement: string;
    integrations: number;
    workflowComplexity: string;
  };
  workflowSteps: string[];
  integrations: string[];
  sourceFile: string;
}

export interface Category {
  id: string;
  name: string;
  count: number;
}

export interface Integration {
  name: string;
  category: string;
  projects: number[];
}

export interface PortfolioData {
  projects: Project[];
  categories: Category[];
  integrations: Integration[];
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface Skill {
  name: string;
  level: number;
  category: string;
  description?: string;
}