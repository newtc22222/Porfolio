export interface ProjectProps {
  title: string;
  period?: string;
  description: string;
  technologies: string[];
  link: string;
  image?: string;
  // Shown instead of `image` in dark mode.
  imageDark?: string;
}
