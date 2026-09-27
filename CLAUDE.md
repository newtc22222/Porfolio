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
- **Content lives in data files, not in components.** Projects, skills, blogs, experiences, education, badges and fun facts are plain arrays in `src/mocks/*.ts`. Personal details (name, job title, email, social links, greetings) are in `src/constants/self-information.ts`. Content edits usually only touch these files. Some sections define their prop types next to the component (`src/pages/*/<X>Type.ts`).
- **Barrel and lazy loading.** Sections are exported from `src/pages/index.ts`. `Skills` and `Badges` are lazy-loaded with `React.lazy` in `App.tsx`. `Contact` is not a section: it is the form inside the floating bottom-right bubble (`src/layout/ContactBubble.tsx`), which lazy-loads it so EmailJS goes into its own chunk.
- **Contact form.** It uses `react-hook-form` with `yup` validation and sends through `@emailjs/browser`. Credentials come from `VITE_EMAILJS_*` env vars (see `.env.example`) and are read in `src/constants/config.ts`.
- **Bundle splitting.** `vite.config.ts` sets manual chunk groups (`vendor`, `emailjs`, `particles`) via `rollupOptions.output.codeSplitting`. If you add a heavy dependency, consider giving it its own group.

## Styling and theming

- Light mode is a low-glare cool grey, not white: use `bg-surface-light dark:bg-surface-dark` for cards, inputs and popovers instead of `bg-white`. Projects and Education have their own section tokens (`projects-*`, `education-*`) in `@theme`. Projects is a gallery wall: each screenshot is framed (`frame-*`, `mat-*`) under a `.picture-light`, with a wall label beside it. Blog is an engineering pad on a blue desk (`blog-*`, `blog-tab-*`): a `.graph-paper` sheet (`src/styles/globals.css`) with topic tabs (`TopicTabs`, a keyboard-navigable tablist with post counts). Experience opens with an overview chart (`Overview.tsx`) that puts jobs and side projects on a real time axis parsed from the `period` strings (`period.ts`, format `Mon YYYY - Present`); each role then lists the projects that overlapped it and a collapsible tech stack. About is a terminal session on `term-*` that types itself out once; its timing is computed from the command lengths in `src/pages/About/index.tsx`.
- The site-wide typeface is Bricolage Grotesque (`--font-sans` in `@theme`, loaded from Google Fonts in `index.html`). `font-sketch` (Architects Daughter) is only for the Skills diagram, and `font-mono` (Martian Mono) is for the About terminal.
- Tailwind v4 is set up CSS-first through the `@tailwindcss/vite` plugin, and there is no `tailwind.config.js`. The entry point and theme tokens are in `src/App.css` (`@import 'tailwindcss'`, the dark `@custom-variant` and the `@theme` block), which is imported in `src/App.tsx`. Put new colors, fonts and other tokens in that `@theme` block. For accent colors use the `brand` (#4DA8DA) and `brand-2` (#80D8C3) tokens (`bg-brand-2/10`, `var(--color-brand)` in plain CSS) instead of hard-coded hex values or Tailwind `blue-*` classes. For accent-colored text on light backgrounds use `text-brand-strong dark:text-brand-2`, because #4DA8DA on white fails WCAG contrast. `src/styles/globals.css` (imported in `src/main.tsx`) and `src/index.css` contain only extra plain CSS.
- Dark mode uses a custom variant tied to `[data-theme=dark]` on `<html>`, not the `prefers-color-scheme` media query. `ThemeToggle` sets that attribute and saves the choice to `localStorage`. Style components with paired tokens, such as `text-primary-light dark:text-primary-dark` and `bg-background-light dark:bg-background-dark`.
- Animations use `framer-motion` (`whileInView` fade-ins are the common pattern). The home hero draws a particle background with `@tsparticles` (slim bundle, loaded via `ParticlesProvider`).
