import type { Skill } from '../pages/Skills/SkillType';

export const SKILLS: Skill[] = [
  // Frontend - Blue theme
  {
    name: 'React',
    level: 90,
    category: 'Frontend',
    color: 'bg-gradient-to-br from-primary-light/20 to-primary-light/10',
    subSkills: [
      { name: 'React Hook Form', proficiency: 'Advanced' },
      { name: 'Redux Toolkit', proficiency: 'Advanced' },
      { name: 'TanStack Query', proficiency: 'Intermediate' },
      { name: 'React Testing Library', proficiency: 'Intermediate' },
    ],
  },
  {
    name: 'Next.js',
    level: 85,
    category: 'Frontend',
    color: 'bg-gradient-to-br from-primary-light/20 to-primary-light/10',
  },
  {
    name: 'TypeScript',
    level: 80,
    category: 'Frontend',
    color: 'bg-gradient-to-br from-primary-light/20 to-primary-light/10',
  },
  {
    name: 'Tailwind CSS',
    level: 85,
    category: 'Frontend',
    color: 'bg-gradient-to-br from-primary-light/20 to-primary-light/10',
  },

  // Backend - Green theme
  {
    name: 'Node.js',
    level: 85,
    category: 'Backend',
    color: 'bg-gradient-to-br from-secondary-light/20 to-secondary-light/10',
  },
  {
    name: 'Express',
    level: 80,
    category: 'Backend',
    color: 'bg-gradient-to-br from-secondary-light/20 to-secondary-light/10',
  },
  {
    name: 'RESTful APIs',
    level: 85,
    category: 'Backend',
    color: 'bg-gradient-to-br from-secondary-light/20 to-secondary-light/10',
  },

  // Database - Yellow theme
  {
    name: 'MongoDB',
    level: 75,
    category: 'Database',
    color: 'bg-gradient-to-br from-accent-light/20 to-accent-light/10',
  },
  {
    name: 'MySQL',
    level: 70,
    category: 'Database',
    color: 'bg-gradient-to-br from-accent-light/20 to-accent-light/10',
  },
];
