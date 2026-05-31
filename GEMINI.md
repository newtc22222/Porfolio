# Gemini CLI Instructions - Portfolio

This document provides context and guidelines for interacting with this React-based portfolio project.

## Project Overview

A modern, responsive, and interactive personal portfolio website built with React 19 and TypeScript. It showcases projects, skills, experiences, and achievements with a focus on high-quality UI/UX through animations and data visualization.

### Tech Stack

- **Framework:** [React 19](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS 4.0](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/), [@tsparticles/react](https://particles.js.org/)
- **Form Handling:** [React Hook Form](https://react-hook-form.com/), [Yup](https://github.com/jquense/yup)
- **Data Visualization:** [Recharts](https://recharts.org/)
- **Integration:** [EmailJS](https://www.emailjs.com/) for contact form.

## Project Structure

- `src/components/`: Shared UI components (CustomSelect, ThemeToggle, etc.).
- `src/layout/`: Global layout elements (Navigation, Footer).
- `src/pages/`: Content sections of the single-page application.
- `src/mocks/`: Static data files defining the content of each section. Update these to change portfolio content.
- `src/constants/`: Configuration and personal info constants.
- `src/styles/`: Global styles and Tailwind base configurations.

## Development Workflow

### Key Commands

- `npm run dev`: Starts the development server at `http://localhost:5173`.
- `npm run build`: Compiles the project using TypeScript (`tsc -b`) and Vite for production.
- `npm run lint`: Runs ESLint to identify and fix code style issues.
- `npm run preview`: Previews the production build locally.

### Coding Conventions

- **Component Patterns:** Use functional components with hooks. Prefer `const` for component definitions.
- **Styling:** Strictly use Tailwind CSS utility classes. Avoid writing custom CSS unless absolutely necessary (use `src/styles/globals.css` if so).
- **Type Safety:** Ensure all props and data structures are correctly typed using TypeScript interfaces or types.
- **Performance:** Use `Suspense` and `lazy` for heavy components like the Contact form.
- **Data Management:** All content (projects, experiences, etc.) should be stored in `src/mocks` to keep components clean and data-driven.

## Feature Implementation Details

- **Navigation:** Uses `react-scroll` for smooth anchor links between sections.
- **Theme Toggle:** Supports Dark/Light mode, managed via a `ThemeToggle` component.
- **Contact Form:** Integrated with `@emailjs/browser` for direct email delivery.
- **Animations:** Extensive use of `framer-motion` for reveal effects and `tsparticles` for the hero background.
