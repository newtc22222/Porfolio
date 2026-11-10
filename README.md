# phivo.dev

Phi Vo's personal site: a maker's desk. It introduces me through the two products I build and run, FF RESTaurent and LinguFlow, each with a small toy you can play with on the home page and a page that tells its story.

Live site: https://phivo.dev

## What is on the desk

The home page scrolls through these stops in order:

| Stop             | What it shows                                                                                                             |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Hero             | One sentence about me, and a playable toy for each product: a receipt you tear into shares, and a flashcard stack.        |
| Products         | Each product's pitch, a lamp showing whether it is up right now, a "try it" link and a link to its story.                 |
| Also on the desk | My other projects as framed prints on a gallery wall.                                                                     |
| Work             | A chart of jobs, products and side projects on one time axis, then each role with its stack. Education and badges follow. |
| Notes            | Posts from my project docs on a graph-paper sheet, with topic tabs.                                                       |
| About            | A terminal session that types out `whoami`, `about.txt` and `fun-facts.json`, with a line that opens the contact form.    |

Each product also has its own page at `/products/<slug>`: why I built it, how it works in three steps, the stack and a changelog.

A floating button in the bottom-right corner opens a contact form that sends email through EmailJS. The site has light and dark themes, works down to phone width, can be used with the keyboard alone, and respects reduced-motion settings.

## Tech stack

- **React 19** with **TypeScript**, built with **Vite 8**
- **React Router 7**, with every route prerendered to static HTML at build time
- **Tailwind CSS v4**, configured in CSS (`src/App.css`) with no `tailwind.config.js`
- **framer-motion** for animation
- **react-scroll** for section navigation on the home page
- **react-hook-form** and **yup** for the contact form, sent with **EmailJS**
- One **Vercel function** (`api/status.ts`) for the product status lamps, and **Vercel Web Analytics**
- **satori** and **resvg** to draw the share cards at build time
- **ESLint** and **Prettier** (with the Tailwind class-sorting plugin)
- Fonts: Bricolage Grotesque and Martian Mono, from Google Fonts

See `package.json` for exact versions.

## Getting started

You need Node.js 22.18 or later (the tests run TypeScript files directly).

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

Everything else works without them. Only sending a message needs them. The status lamps do not appear in `npm run dev`, because the status function only runs on Vercel.

## Scripts

| Command           | What it does                                                                                     |
| ----------------- | ------------------------------------------------------------------------------------------------ |
| `npm run dev`     | Starts the Vite dev server.                                                                      |
| `npm run build`   | Type-checks, builds to `dist/`, prerenders every route and writes the share cards to `dist/og/`. |
| `npm run lint`    | Runs ESLint.                                                                                     |
| `npm test`        | Runs the unit tests with Node's built-in test runner.                                            |
| `npm run preview` | Serves the built `dist/` locally.                                                                |

The tests cover the pure logic: splitting a bill, ordering the flashcard queue and reading the status answer. The build is the other check: it runs the TypeScript compiler, and its prerender step fails if a product is missing from the generated pages. Format with `npx prettier --write <files>`.

## Editing content

Content lives in data files, so most updates don't touch any components:

| To change                                       | Edit                                |
| ----------------------------------------------- | ----------------------------------- |
| Name, job title, email, social links, hero line | `src/constants/self-information.ts` |
| Products, their links, stories and changelogs   | `src/mocks/products.ts`             |
| Other projects                                  | `src/mocks/projects.ts`             |
| Jobs and the stack used in each                 | `src/mocks/experiences.ts`          |
| Degrees                                         | `src/mocks/education.ts`            |
| Badges and certificates                         | `src/mocks/badges.ts`               |
| Blog posts                                      | `src/mocks/blogs.ts`                |
| About facts and fun facts                       | `src/mocks/facts.ts`                |
| Page titles and descriptions                    | `src/seo/meta.ts`                   |

Write product, project and job dates as `Mon YYYY - Present` or `Mon YYYY - Mon YYYY` (for example `Feb 2023 - Mar 2025`). The Work chart reads them to place each bar. Screenshots go in `public/assets/projects/`, with a light and a dark version.

### Adding a product

1. Add one entry to `src/mocks/products.ts`. It gets a card on the home page, its own page at `/products/<slug>`, a sitemap entry and a share card.
2. Optional: give it a `health` URL, and its status lamp appears.
3. Optional: build a toy in `src/toys/<name>/`, add its key to `ToyKey` in `src/pages/Products/ProductType.ts` and to `src/toys/registry.ts`, and set `toy` on the entry. Without a toy, the product shows its framed screenshot.

## Project structure

```
api/status.ts        Vercel function behind the status lamps
scripts/             Build steps: prerender the routes, draw the share cards
src/
  App.tsx            Layout and routes
  entry-server.tsx   Server entry used by the prerender step
  App.css            Tailwind entry point and theme tokens (colours, fonts)
  pages/             The desk (home), its sections, the product page, the 404
  toys/              The receipt and flashcard toys, and their loader
  components/motion/ Shared motion primitives
  layout/            Navigation, footer and the contact bubble
  mocks/             Content: products, projects, jobs, posts, ...
  seo/               Per-page title, description and share image
  constants/         Personal details and EmailJS config
  styles/            Extra plain CSS (the Blog graph paper)
public/assets/       Images, including screenshots
docs/design/         The design and the implementation plan for this site
```

To add or rename a home page section, keep `src/pages/Desk.tsx`, the section's `Element` name and its entry in `src/mocks/pages.ts` in sync, so the navbar links still work.

## Deployment

The site is hosted on Vercel, which builds it with `npm run build` and serves `dist/` plus the function in `api/`. `vercel.json` turns on clean URLs, so `dist/products/linguflow.html` is served at `/products/linguflow`.

Set the three `VITE_EMAILJS_*` variables in the Vercel project settings so the contact form works in production. Web Analytics is switched on in the Vercel dashboard.
