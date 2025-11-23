export interface Achievement {
  title: string;
  description: string;
  icon: string;
  color: string;
}

export interface RichAchievement extends Achievement {
  id: string;
  date?: string; // ISO date
  link?: string; // proof or certificate
  image?: string; // thumbnail or certificate image
  category?: string; // e.g., "Recognition", "Metric", "Certification"
  verified?: boolean;
  metrics?: string | number;
}
