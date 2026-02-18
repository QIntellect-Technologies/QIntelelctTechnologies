
export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  features: string[];
  benefits: string[];
  industries: string[];
  icon: string;
  technologies: string[];
  approach: string;
  implementationSteps: {
    title: string;
    description: string;
    details: string[];
  }[];
  deepTechnicalDetail?: string;
}

export interface Industry {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  features: string[];
  benefits: string[];
  services: string[];
  icon: string;
  technologies: string[];
  challenges: string[];
  solutions: {
    title: string;
    description: string;
    details: string[];
  }[];
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  domain: string;
  client: string;
  summary: string;
  metrics: { label: string; value: string }[];
  stack: string[];
  image: string;
  category: 'AI' | 'Chatbot' | 'ERP' | 'EDI' | 'Web' | 'Dynamics';
}

export interface BlogSection {
  heading?: string;
  content: string[];
  code?: string;
  subheading?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  sections: BlogSection[];
  category: string;
  author: string;
  authorRole: string;
  authorImage: string;
  date: string;
  readTime: string;
  image: string;
  galleryImages: string[];
  tags: string[];
  technicalSpecs?: { label: string; value: string }[];
}
