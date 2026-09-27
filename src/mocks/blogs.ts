const TECH_DOCS = 'https://technical-documents.vercel.app/docs';

export const BLOG_POSTS = [
  {
    title: 'LinguFlow Documentation',
    description:
      'Architecture, database schema, AI features, deployment and release notes for LinguFlow',
    link: `${TECH_DOCS}/lingu-flow/`,
    thumbnail: 'https://placehold.co/600x400?text=LinguFlow+Docs&font=Oswald',
    topic: 'Project Docs',
  },
  {
    title: 'FF RESTaurent Documentation',
    description:
      'Development guides, domain contracts, GCP deployment, runbooks and release notes for FF RESTaurent',
    link: `${TECH_DOCS}/ff-restaurent/`,
    thumbnail:
      'https://placehold.co/600x400?text=FF+RESTaurent+Docs&font=Oswald',
    topic: 'Project Docs',
  },
  {
    title: 'SM-2 Spaced Repetition Engine',
    description:
      'The maths behind SuperMemo-2 and how LinguFlow implements it in Python to schedule flashcard reviews',
    link: `${TECH_DOCS}/lingu-flow/architecture/spaced-repetition-sm2/`,
    thumbnail:
      'https://placehold.co/600x400?text=SM-2+Spaced+Repetition&font=Oswald',
    topic: 'Backend',
  },
  {
    title: 'Designing an AI Service Layer',
    description:
      'Provider routing, error handling, rate limiting and HTTP contracts for a vendor-agnostic AI layer',
    link: `${TECH_DOCS}/lingu-flow/features/ai-service-layer/`,
    thumbnail: 'https://placehold.co/600x400?text=AI+Service+Layer&font=Lato',
    topic: 'AI',
  },
  {
    title: 'Migrating from Render to Google Cloud',
    description:
      'Timeline, provisioning script and troubleshooting record of moving FF RESTaurent to Cloud Run',
    link: `${TECH_DOCS}/ff-restaurent/deployment-infrastructure/gcp-migration-timeline/`,
    thumbnail: 'https://placehold.co/600x400?text=GCP+Migration&font=Open+Sans',
    topic: 'DevOps',
  },
  {
    title: 'PostgreSQL Migration Playbook',
    description:
      'Strategy, verification and cutover for moving from Render PostgreSQL to Cloud SQL',
    link: `${TECH_DOCS}/ff-restaurent/deployment-infrastructure/database-migration-playbook/`,
    thumbnail:
      'https://placehold.co/600x400?text=Database+Migration&font=Oswald',
    topic: 'Database',
  },
  {
    title: 'Index Coverage and Bundle Splitting',
    description:
      'Before-and-after evidence from adding missing indexes and splitting the web bundle',
    link: `${TECH_DOCS}/ff-restaurent/performance/ff-27-optimization/`,
    thumbnail:
      'https://placehold.co/600x400?text=Query+%26+Bundle+Optimization&font=Noto+Sans',
    topic: 'Database',
  },
  {
    title: 'Real-Time Inbox with Server-Sent Events',
    description:
      'Keeping a notification list and unread badge live with an authenticated SSE stream',
    link: `${TECH_DOCS}/ff-restaurent/runbooks-operations/real-time-notification-inbox/`,
    thumbnail: 'https://placehold.co/600x400?text=Server-Sent+Events&font=Lato',
    topic: 'Backend',
  },
  {
    title: 'API Versioning Strategies',
    description: 'A comprehensive guide to versioning APIs effectively',
    link: 'https://sunflynf.github.io/web-notes/docs/key-notes/api-versioning/',
    thumbnail: 'https://placehold.co/600x400?text=API+Versioning&font=Oswald',
    topic: 'Backend',
  },
  {
    title: 'Programming Principles',
    description:
      'Exploring fundamental programming principles for better code quality',
    link: 'https://sunflynf.github.io/web-notes/blog/2024/12/06/programming-princibles/',
    thumbnail:
      'https://placehold.co/600x400?text=Programming+Principles&font=Noto+Sans',
    topic: 'Principle',
  },
  {
    title: 'Comparisons: Node ORMs',
    description: 'A detailed comparison of Node.js ORM libraries',
    link: 'https://sunflynf.github.io/web-notes/docs/technologies/js/api/orm/',
    thumbnail:
      'https://placehold.co/600x400?text=Node+ORM+and+Query+Builder&font=Oswald',
    topic: 'Backend',
  },
  {
    title: 'Comparisons: React State Management',
    description: 'A guide to different state management solutions in React',
    link: 'https://sunflynf.github.io/web-notes/docs/technologies/js/libraries/react/state/',
    thumbnail:
      'https://placehold.co/600x400?text=React+State+Management&font=Open+Sans',
    topic: 'Frontend',
  },
  {
    title: 'Comparisons: Redux Middleware',
    description: 'A guide to different middleware solutions in Redux',
    link: 'https://sunflynf.github.io/web-notes/docs/technologies/js/libraries/react/state/redux-technologies/',
    thumbnail: 'https://placehold.co/600x400?text=Redux+Middleware&font=Lato',
    topic: 'Frontend',
  },
];
