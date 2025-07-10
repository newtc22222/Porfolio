import type { Skill } from '../pages/Skills/SkillType';

const FRONT_END: Skill[] = [
  {
    name: 'React',
    category: 'Frontend',
    color: 'bg-gradient-to-br from-primary-light/20 to-primary-light/10',
    subSkills: [
      { name: 'React Context', proficiency: 'Advanced' },
      { name: 'React Hook', proficiency: 'Advanced' },
      { name: 'React Router', proficiency: 'Advanced' },
      { name: 'React Hook Form', proficiency: 'Advanced' },
      { name: 'Redux Toolkit', proficiency: 'Intermediate' },
      { name: 'Redux Toolkit Query', proficiency: 'Intermediate' },
      { name: 'TanStack Query', proficiency: 'Intermediate' },
      { name: 'TanStack Table', proficiency: 'Advanced' },
      { name: 'React Testing Library', proficiency: 'Intermediate' },
      { name: 'React Native', proficiency: 'Intermediate' },
    ],
  },
  {
    name: 'CSS Preprocessors',
    category: 'Frontend',
    color: 'bg-gradient-to-br from-primary-light/20 to-primary-light/10',
    subSkills: [
      { name: 'Sass', proficiency: 'Advanced' },
      { name: 'Less', proficiency: 'Intermediate' },
      { name: 'Bootstrap', proficiency: 'Advanced' },
      { name: 'Tailwind CSS', proficiency: 'Intermediate' },
      { name: 'Styled Components', proficiency: 'Basic' },
      { name: 'Material-UI', proficiency: 'Basic' },
      { name: 'Ant Design', proficiency: 'Basic' },
      { name: 'Shadcn UI', proficiency: 'Basic' },
    ],
  },
  {
    name: 'Frameworks',
    category: 'Frontend',
    color: 'bg-gradient-to-br from-primary-light/20 to-primary-light/10',
    subSkills: [
      { name: 'Docusaurus', proficiency: 'Intermediate' },
      { name: 'Next.js', proficiency: 'Intermediate' },
      { name: 'Astro', proficiency: 'Basic' },
      { name: 'Vue.js', proficiency: 'Intermediate' },
      { name: 'Nuxt.js', proficiency: 'Basic' },
      { name: 'Angular', proficiency: 'Basic' },
      { name: 'Svelte', proficiency: 'Basic' },
    ],
  },
];

const BACK_END: Skill[] = [
  {
    name: 'Spring Framework',
    category: 'Backend',
    color: 'bg-gradient-to-br from-secondary-light/20 to-secondary-light/10',
    subSkills: [
      { name: 'Spring Boot', proficiency: 'Intermediate' },
      { name: 'Spring REST', proficiency: 'Intermediate' },
      { name: 'Spring MVC', proficiency: 'Intermediate' },
      { name: 'Spring Data JPA', proficiency: 'Intermediate' },
      { name: 'Spring Data JDBC', proficiency: 'Intermediate' },
      // { name: 'Spring GraphQL', proficiency: 'Basic' },
      { name: 'Spring Security', proficiency: 'Basic' },
      // { name: 'Spring Cloud', proficiency: 'Basic' },
      // { name: 'Spring Batch', proficiency: 'Basic' },
      // { name: 'Spring WebFlux', proficiency: 'Basic' },
    ],
  },
  {
    name: 'Languages',
    category: 'Backend',
    color: 'bg-gradient-to-br from-secondary-light/20 to-secondary-light/10',
    subSkills: [
      { name: 'JavaScript', proficiency: 'Advanced' },
      { name: 'TypeScript', proficiency: 'Intermediate' },
      { name: 'Java', proficiency: 'Intermediate' },
      { name: 'Python', proficiency: 'Basic' },
      { name: 'Go', proficiency: 'Basic' },
      { name: 'PHP', proficiency: 'Basic' },
    ],
  },
  {
    name: 'Environments',
    category: 'Backend',
    color: 'bg-gradient-to-br from-secondary-light/20 to-secondary-light/10',
    subSkills: [
      { name: 'Node.js', proficiency: 'Intermediate' },
      { name: 'Deno', proficiency: 'Basic' },
      { name: 'Bun', proficiency: 'Basic' },
      { name: 'Maven', proficiency: 'Intermediate' },
      { name: 'Gradle', proficiency: 'Basic' },
    ],
  },
  {
    name: 'Other Frameworks',
    category: 'Backend',
    color: 'bg-gradient-to-br from-secondary-light/20 to-secondary-light/10',
    subSkills: [
      { name: 'Express.js', proficiency: 'Intermediate' },
      { name: 'Fastify', proficiency: 'Basic' },
      { name: 'NestJS', proficiency: 'Intermediate' },
      { name: 'Flask', proficiency: 'Basic' },
      { name: 'Django', proficiency: 'Basic' },
      { name: 'FastAPI', proficiency: 'Basic' },
      { name: 'Laravel', proficiency: 'Basic' },
    ],
  },
];

const DATABASE: Skill[] = [
  {
    name: 'MySQL',
    category: 'Database',
    color: 'bg-gradient-to-br from-accent-light/20 to-accent-light/10',
    subSkills: [
      { name: 'Table Design', proficiency: 'Intermediate' },
      { name: 'Stored Procedures', proficiency: 'Intermediate' },
      { name: 'Triggers', proficiency: 'Intermediate' },
      { name: 'Views', proficiency: 'Intermediate' },
      { name: 'Transactions', proficiency: 'Intermediate' },
      { name: 'Indexes', proficiency: 'Intermediate' },
    ],
  },
  {
    name: 'MongoDB',
    category: 'Database',
    color: 'bg-gradient-to-br from-accent-light/20 to-accent-light/10',
    subSkills: [
      { name: 'Schema Design', proficiency: 'Intermediate' },
      { name: 'Aggregation Framework', proficiency: 'Intermediate' },
      { name: 'Indexes', proficiency: 'Intermediate' },
      { name: 'Replication', proficiency: 'Basic' },
      { name: 'Sharding', proficiency: 'Basic' },
      { name: 'Transactions', proficiency: 'Basic' },
    ],
  },
  {
    name: 'PostgreSQL',
    category: 'Database',
    color: 'bg-gradient-to-br from-accent-light/20 to-accent-light/10',
    subSkills: [
      { name: 'Table Design', proficiency: 'Intermediate' },
      { name: 'Stored Procedures', proficiency: 'Intermediate' },
      { name: 'Triggers', proficiency: 'Intermediate' },
      { name: 'Views', proficiency: 'Intermediate' },
      { name: 'Transactions', proficiency: 'Intermediate' },
      { name: 'Indexes', proficiency: 'Intermediate' },
      { name: 'JSONB', proficiency: 'Basic' },
      { name: 'Full-Text Search', proficiency: 'Basic' },
    ],
  },
];

export const SKILLS: Skill[] = [...FRONT_END, ...BACK_END, ...DATABASE];
