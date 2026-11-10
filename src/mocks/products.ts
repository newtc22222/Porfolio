// This file is also imported by the Vercel function in api/status.ts, so it
// must import types only, and with the `.js` extension that function's
// compiler asks for.
import type { Product } from '../pages/Products/ProductType.js';

export const PRODUCTS: Product[] = [
  {
    slug: 'ff-restaurent',
    name: 'FF RESTaurent',
    // DRAFT: Phi to review
    tagline: 'Split the bill before the tea goes cold.',
    // DRAFT: Phi to review
    pitch:
      'Group bill-splitting and a restaurant tracker for a team that eats out together. Log the meal, mark who had what, and everyone sees what they owe.',
    period: 'Jul 2026 - Present',
    links: [
      {
        label: 'Open FF RESTaurent',
        href: 'https://restaurant.phivo.dev',
        primary: true,
      },
      { label: 'app.ff-restaurent.com', href: 'https://app.ff-restaurent.com' },
    ],
    health: 'https://restaurant-api.phivo.dev/health',
    toy: 'receipt',
    image: '/assets/projects/ff-restaurent-light.png',
    imageDark: '/assets/projects/ff-restaurent-dark.png',
    story: {
      // DRAFT: Phi to review
      why: [
        'Every team lunch ended the same way: one person paid, then spent the afternoon working out who owed what and chasing transfers.',
        'I built FF RESTaurent so the group could record the meal once and be done. It also remembers where we have eaten, so "where should we go?" has an answer.',
      ],
      // DRAFT: Phi to review
      steps: [
        {
          title: 'Log the meal',
          text: 'Pick the restaurant, add the dishes and the total. It works as an installed app on the phone, at the table.',
          image: '/assets/projects/ff-restaurent-light.png',
          imageDark: '/assets/projects/ff-restaurent-dark.png',
        },
        {
          title: 'Mark who had what',
          text: 'Assign dishes to people. Shared dishes are divided among the people who shared them.',
          image: '/assets/projects/ff-restaurent-light.png',
          imageDark: '/assets/projects/ff-restaurent-dark.png',
        },
        {
          title: 'Everyone sees their share',
          text: 'Each person gets one number to pay, and the restaurant goes into the group history.',
          image: '/assets/projects/ff-restaurent-light.png',
          imageDark: '/assets/projects/ff-restaurent-dark.png',
        },
      ],
      stack: [
        'React',
        'React Router 7',
        'TypeScript',
        'Tailwind CSS',
        'Vite PWA',
        'Fastify',
        'Prisma',
        'PostgreSQL',
        'Supabase Storage',
        'Docker Compose',
        'Caddy',
        'Vercel',
      ],
      // DRAFT: Phi to review
      changelog: [
        { date: 'Nov 2026', text: 'Now also at restaurant.phivo.dev.' },
        {
          date: '2026',
          text: 'Moved the API and database to a single VPS running Docker Compose, with the frontend on Vercel.',
        },
        { date: 'Jul 2026', text: 'First version in use by the team.' },
      ],
    },
  },
  {
    slug: 'linguflow',
    name: 'LinguFlow',
    // DRAFT: Phi to review
    tagline: 'Flashcards you drive from the keyboard.',
    // DRAFT: Phi to review
    pitch:
      'Spaced-repetition flashcards and timed mock exams for TOEIC, IELTS, HSK and JLPT, built to be used without reaching for the mouse.',
    period: 'Jul 2026 - Present',
    links: [
      {
        label: 'Open LinguFlow',
        href: 'https://lingu.phivo.dev',
        primary: true,
      },
      { label: 'lingu-flow.vercel.app', href: 'https://lingu-flow.vercel.app' },
    ],
    health: 'https://lingu-api.phivo.dev/api/health',
    toy: 'flashcards',
    image: '/assets/projects/lingu-flow-light.png',
    imageDark: '/assets/projects/lingu-flow-dark.png',
    story: {
      // DRAFT: Phi to review
      why: [
        'Most flashcard apps make you click through every card. When you review a few hundred words a day, that adds up.',
        'LinguFlow keeps your hands on the keyboard: flip, rate and move on. It schedules reviews with SM-2 spaced repetition and adds timed mock exams, so practice looks like the real test.',
      ],
      // DRAFT: Phi to review
      steps: [
        {
          title: 'Review with the keyboard',
          text: 'Flip a card, rate how well you knew it, and the next one is already there.',
          image: '/assets/projects/lingu-flow-light.png',
          imageDark: '/assets/projects/lingu-flow-dark.png',
        },
        {
          title: 'Let the schedule do the remembering',
          text: 'SM-2 spaced repetition brings a card back just before you would forget it.',
          image: '/assets/projects/lingu-flow-light.png',
          imageDark: '/assets/projects/lingu-flow-dark.png',
        },
        {
          title: 'Sit a mock exam',
          text: 'Timed papers for TOEIC, IELTS, HSK and JLPT, with practice drills, TOEIC listening and an optional AI tutor.',
          image: '/assets/projects/lingu-flow-light.png',
          imageDark: '/assets/projects/lingu-flow-dark.png',
        },
      ],
      stack: [
        'Vue 3',
        'Pinia',
        'Vue Router',
        'vue-i18n',
        'FastAPI',
        'SQLAlchemy 2.0',
        'Alembic',
        'PostgreSQL',
        'Gemini',
        'Cloudflare R2',
        'Docker Compose',
        'Caddy',
        'Vercel',
      ],
      // DRAFT: Phi to review
      changelog: [
        { date: 'Nov 2026', text: 'Now also at lingu.phivo.dev.' },
        {
          date: '2026',
          text: 'Moved the API and database to a single VPS running Docker Compose, with the frontend on Vercel.',
        },
        { date: 'Jul 2026', text: 'First version online.' },
      ],
    },
  },
];

export const findProduct = (slug: string): Product | undefined =>
  PRODUCTS.find((product) => product.slug === slug);
