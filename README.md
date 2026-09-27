# Phi Vo's portfolio

A single-page portfolio for Phi Vo, a software engineer working across frontend, backend and AI. It shows the projects I build and run, where I've worked, the tools I use and what I've written about them.

Live site: https://porfolio-seven-dun.vercel.app/

## Sections

The page scrolls through these sections in order. Each one has its own look:

| Section    | What it shows                                                                                                                             |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Home       | A greeting over an interactive particle background.                                                                                       |
| Projects   | A gallery wall: each project's screenshot is framed under a picture light, with a label for its dates, description and stack.             |
| Experience | A chart of jobs and side projects on one time axis, then each role with its duration, the projects built alongside it and its full stack. |
| Skills     | A searchable stack diagram (frontend, backend, data, AI) and a collection of tools filterable by level.                                   |
| Education  | Degrees on ruled notebook paper.                                                                                                          |
| Badges     | Certificates and badges, filterable by issuer. Hidden when there are none.                                                                |
| Blog       | Posts from my project docs on a graph-paper sheet, with topic tabs.                                                                       |
| About      | A terminal session that types out `whoami`, `about.txt` and `fun-facts.json`.                                                             |

A floating button in the bottom-right corner opens a contact form that sends email through EmailJS. The site has light and dark themes, works down to phone width, and respects reduced-motion settings.

## Tech stack

- **React 19** with **TypeScript**, built with **Vite 8**
- **Tailwind CSS v4**, configured in CSS (`src/App.css`) with no `tailwind.config.js`
- **framer-motion** for animation and **tsParticles** for the home background
- **react-scroll** for section navigation
- **react-hook-form** and **yup** for the contact form, sent with **EmailJS**
- **ESLint** and **Prettier** (with the Tailwind class-sorting plugin)
- Fonts: Bricolage Grotesque, Martian Mono and Architects Daughter, from Google Fonts

See `package.json` for exact versions.

## Getting started

You need Node.js 22 or later.

```bash
npm install
cp .env.example .env   # then fill in your EmailJS keys
npm run dev
```

The contact form reads its EmailJS credentials from these variables in `.env`:

| Variable                   | Where to find it                   |
| -------------------------- | ---------------------------------- |
| `VITE_EMAILJS_SERVICE_ID`  | EmailJS dashboard, Email Services  |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS dashboard, Email Templates |
| `VITE_EMAILJS_PUBLIC_KEY`  | EmailJS dashboard, Account         |

Everything else works without them. Only sending a message needs them.

## Scripts

| Command           | What it does                                       |
| ----------------- | -------------------------------------------------- |
| `npm run dev`     | Starts the Vite dev server.                        |
| `npm run build`   | Type-checks with `tsc -b`, then builds to `dist/`. |
| `npm run lint`    | Runs ESLint.                                       |
| `npm run preview` | Serves the built `dist/` locally.                  |

There is no test suite. `npm run build` is the main check, because it runs the TypeScript compiler. Format with `npx prettier --write <files>`.

## Editing content

Content lives in data files, so most updates don't touch any components:

| To change                                       | Edit                                |
| ----------------------------------------------- | ----------------------------------- |
| Name, job title, email, social links, greetings | `src/constants/self-information.ts` |
| Projects                                        | `src/mocks/projects.ts`             |
| Jobs                                            | `src/mocks/experiences.ts`          |
| Skills                                          | `src/mocks/skills.ts`               |
| Degrees                                         | `src/mocks/education.ts`            |
| Badges and certificates                         | `src/mocks/badges.ts`               |
| Blog posts                                      | `src/mocks/blogs.ts`                |
| About facts and fun facts                       | `src/mocks/facts.ts`                |

Write project and job dates as `Mon YYYY - Present` or `Mon YYYY - Mon YYYY` (for example `Feb 2023 - Mar 2025`). The Experience chart reads them to place each bar. Project screenshots go in `public/assets/projects/`, with a light and a dark version.

## Project structure

```
src/
  App.tsx            Renders every section in order
  App.css            Tailwind entry point and theme tokens (colours, fonts)
  pages/             One folder per section
  layout/            Navigation, footer and the contact bubble
  mocks/             Content: projects, jobs, skills, posts, ...
  constants/         Personal details and EmailJS config
  styles/            Extra plain CSS (the Blog graph paper)
public/assets/       Images, including project screenshots
```

To add or rename a section, keep `App.tsx`, the section's `Element` name and its entry in `src/mocks/pages.ts` in sync, so the navbar links still work.

## Deployment

The live site is hosted on Vercel. Set the three `VITE_EMAILJS_*` variables in the Vercel project settings so the contact form works in production.
