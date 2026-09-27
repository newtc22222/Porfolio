const TECH_DOCS = 'https://technical-documents.vercel.app/docs';

export const BLOG_POSTS = [
  {
    title: 'LinguFlow Documentation',
    description:
      'Architecture, database schema, AI features, deployment and release notes for LinguFlow',
    link: `${TECH_DOCS}/lingu-flow/`,
    topic: 'Project Docs',
  },
  {
    title: 'FF RESTaurent Documentation',
    description:
      'Development guides, domain contracts, GCP deployment, runbooks and release notes for FF RESTaurent',
    link: `${TECH_DOCS}/ff-restaurent/`,
    topic: 'Project Docs',
  },
  {
    title: 'SM-2 Spaced Repetition Engine',
    description:
      'The maths behind SuperMemo-2 and how LinguFlow implements it in Python to schedule flashcard reviews',
    link: `${TECH_DOCS}/lingu-flow/architecture/spaced-repetition-sm2/`,
    topic: 'Backend',
  },
  {
    title: 'Designing an AI Service Layer',
    description:
      'Provider routing, error handling, rate limiting and HTTP contracts for a vendor-agnostic AI layer',
    link: `${TECH_DOCS}/lingu-flow/features/ai-service-layer/`,
    topic: 'AI',
  },
  {
    title: 'Migrating from Render to Google Cloud',
    description:
      'Timeline, provisioning script and troubleshooting record of moving FF RESTaurent to Cloud Run',
    link: `${TECH_DOCS}/ff-restaurent/deployment-infrastructure/gcp-migration-timeline/`,
    topic: 'DevOps',
  },
  {
    title: 'PostgreSQL Migration Playbook',
    description:
      'Strategy, verification and cutover for moving from Render PostgreSQL to Cloud SQL',
    link: `${TECH_DOCS}/ff-restaurent/deployment-infrastructure/database-migration-playbook/`,
    topic: 'Database',
  },
  {
    title: 'Index Coverage and Bundle Splitting',
    description:
      'Before-and-after evidence from adding missing indexes and splitting the web bundle',
    link: `${TECH_DOCS}/ff-restaurent/performance/ff-27-optimization/`,
    topic: 'Database',
  },
  {
    title: 'Real-Time Inbox with Server-Sent Events',
    description:
      'Keeping a notification list and unread badge live with an authenticated SSE stream',
    link: `${TECH_DOCS}/ff-restaurent/runbooks-operations/real-time-notification-inbox/`,
    topic: 'Backend',
  },
];
