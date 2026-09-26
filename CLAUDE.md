# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev`: Vite dev server
- `npm run build`: type-check (`tsc -b`) then production build to `dist/`
- `npm run lint`: ESLint (flat config in `eslint.config.js`)
- `npm run preview`: serve the built `dist/`
- `npx prettier --write <files>`: format (single quotes, semicolons, `trailingComma: es5`, 80 cols, with `prettier-plugin-tailwindcss` sorting class names)

There is no test suite. `npm run build` is the main correctness check because it runs the TypeScript compiler.

## Architecture

This is a single-page personal portfolio built with React 19, Vite 8, TypeScript and Tailwind CSS v4. There is no router: `src/App.tsx` renders every section in order on one scrolling page.

- **Sections and navigation.** Each section in `src/pages/<Name>/index.tsx` is wrapped in a `react-scroll` `<Element name="#id">` with a matching `<section id="id">`. The navbar (`src/layout/Navigation`) builds its links from `NAV_PAGES` in `src/mocks/pages.ts`. When you add, rename or reorder a section, keep `App.tsx`, the `Element` name and the `NAV_PAGES` `href` in sync. The ids are not always the same as the folder names (for example `#blog` and `#experience`).
- **Content lives in data files, not in components.** Projects, skills, blogs, experiences, education, achievements and fun facts are plain arrays in `src/mocks/*.ts`. Personal details (name, job title, email, social links, greetings) are in `src/constants/self-information.ts`. Content edits usually only touch these files. Some sections define their prop types next to the component (`src/pages/*/<X>Type.ts`).
- **Barrel and lazy loading.** Sections are exported from `src/pages/index.ts`. The exception is `Contact`, which is left out of the barrel on purpose and lazy-loaded with `React.lazy` in `App.tsx` so that EmailJS goes into its own chunk.
- **Contact form.** It uses `react-hook-form` with `yup` validation and sends through `@emailjs/browser`. Credentials come from `VITE_EMAILJS_*` env vars (see `.env.example`) and are read in `src/constants/config.ts`.
- **Bundle splitting.** `vite.config.ts` sets manual chunk groups (`vendor`, `emailjs`, `particles`) via `rollupOptions.output.codeSplitting`. If you add a heavy dependency, consider giving it its own group.

## Styling and theming

- Tailwind v4 is set up CSS-first through the `@tailwindcss/vite` plugin, and there is no `tailwind.config.js`. The entry point and theme tokens are in `src/styles/globals.css` (`@import 'tailwindcss'` plus the `@theme` block), which is imported once in `src/main.tsx`. Put new colors, fonts and other tokens in that `@theme` block. `src/index.css` and `src/App.css` contain only extra plain CSS.
- Dark mode uses a custom variant tied to `[data-theme=dark]` on `<html>`, not the `prefers-color-scheme` media query. `ThemeToggle` sets that attribute and saves the choice to `localStorage`. Style components with paired tokens, such as `text-primary-light dark:text-primary-dark` and `bg-background-light dark:bg-background-dark`.
- Animations use `framer-motion` (`whileInView` fade-ins are the common pattern). The home hero draws a particle background with `@tsparticles` (slim bundle, loaded via `ParticlesProvider`).
