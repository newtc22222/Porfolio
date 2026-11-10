# phivo.dev Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the single-page portfolio into the "maker's desk" site for
`https://phivo.dev`, with two playable product toys, one data-driven page per
product, a live status lamp, and prerendered pages with share cards.

**Architecture:** React Router adds `/`, `/products/:slug` and a 404. A
second Vite build (`--ssr`) produces a server entry that a small Node script
uses to prerender every route to static HTML, so the site stays static on
Vercel. Product content is one entry in `src/mocks/products.ts`; toys are
lazy components looked up by key; one Vercel function reports product health.

**Tech Stack:** React 19, Vite 8, TypeScript 6, Tailwind CSS v4, framer-motion
(existing). New: `react-router` 7, `@vercel/analytics`; dev only: `@types/node`,
`satori`, `@resvg/resvg-js`. Tests use Node's built-in runner (`node --test`),
no test framework.

**Spec:** `docs/design/phivo-dev.md`. Read it before starting any task.

## Global Constraints

- Follow `CLAUDE.md` and `AGENTS.md`: tokens in the `@theme` block of
  `src/App.css`; accents only via `brand` / `brand-2`; accent text on light
  backgrounds is `text-brand-strong dark:text-brand-2`; cards use
  `bg-surface-light dark:bg-surface-dark`, never `bg-white`; content in
  `src/mocks/*.ts`.
- Motion: framer-motion and CSS only. No GSAP, Lottie, Rive, canvas or WebGL.
  Animate only `transform` and `opacity`.
- Every animation has a reduced-motion form that shows the end state. Every
  drag or gesture has a button or key alternative. Focus is always visible.
- English only. No i18n library.
- Budget: home page JavaScript at first load is 150 KB gzipped or less;
  Lighthouse mobile performance on `/` is 90 or more; no layout shift from
  lazy toys.
- Toys make no network calls. The browser never calls the product APIs.
- No change to the VPS, its env files, Caddy or Cloudflare DNS.
- Work on branch `feat/phivo-dev`, created from `design/phivo-dev`. Ask Phi
  before pushing any branch to GitHub, and before any merge or push to `main`
  (that deploys production).
- Do not commit or discard Phi's uncommitted change in
  `src/mocks/experiences.ts`; never use `git add -A` or `git add .`.
- Every task ends with `npm run build`, `npm run lint`, `npm test` and
  `npx prettier --check` on the files it touched, all passing.
- Dates in data use `Mon YYYY - Present` or `Mon YYYY - Mon YYYY`.
- Commit messages follow the repo style (`feat(scope): ...`) and end with
  `Co-Authored-By: Claude Fable 5.2 <noreply@anthropic.com>`.

**One deviation from the spec, for Phi to accept or reject:** the spec lists
"a test suite" as a non-goal. This plan adds `npm test` with Node's built-in
runner, with no new dependency, for three pure modules only (bill split,
card queue, status parsing). If Phi rejects it, drop the test steps and the
`test` script; nothing else changes.

## Review Focus

1. **A dish nobody is assigned to, or a person with no dishes.** The dish is
   split among everyone, the person shows `0 đ`, and the shares always add up
   to the receipt total exactly. Pinned in Task 6 (`split.test.ts`).
2. **`/api/status` answers with HTML, bad JSON or nothing** (as in
   `npm run dev`, or when the function is down). The lamp is hidden; no
   product is shown as down. Pinned in Task 9 (`status.test.ts`).
3. **A health endpoint hangs, throws or returns a non-200.** That product is
   `down` within 3 seconds and the function still answers 200. Pinned in
   Task 9 (`status.test.ts`).
4. **An unknown address such as `/products/nope`.** The 404 page renders with
   a link home; nothing crashes, and `dist/404.html` exists. Pinned in Task 2
   (assertions in `scripts/prerender.mjs`).
5. **JavaScript is off, or a toy chunk fails to load.** The prerendered HTML
   still shows each product's name, pitch and "try it" link, and the toy's
   placeholder picture holds its space. Pinned in Task 2 (prerender
   assertions) and Task 5 (`ToySlot` error fallback).

---

## File Structure

```
api/status.ts                      Vercel function: product health, cached 60 s
scripts/prerender.mjs              Writes dist/**/index.html, 404.html, sitemap, robots
scripts/build-og.mjs               Writes dist/og/*.png from product data
scripts/fonts/                     One TTF for the share cards
vercel.json                        cleanUrls, trailingSlash
src/main.tsx                       hydrateRoot or createRoot, BrowserRouter
src/entry-server.tsx               render(), staticPaths(), getMeta() for the scripts
src/App.tsx                        Layout plus <Routes>
src/lib/status.ts                  checkHealth, parseStatus (shared by api and client)
src/lib/buildDate.ts               BUILD_DATE constant (same on server and client)
src/seo/meta.ts                    getMeta(pathname), SITE_URL
src/mocks/products.ts              PRODUCTS: one entry per product
src/mocks/projects.ts              The three other projects only
src/mocks/pages.ts                 NAV_PAGES: Products, Work, Notes, About
src/components/motion/             Reveal, Pickup, Flip, Tear, ScrollSteps, Typewriter, index.ts
src/components/StatusLamp.tsx      The lamp
src/hooks/useProductStatus.ts      Fetches /api/status once per page load
src/toys/registry.ts               toy key -> lazy component
src/toys/ToySlot.tsx               In-view loader with placeholder and error fallback
src/toys/receipt/                  Receipt.tsx, split.ts, split.test.ts, sample.ts
src/toys/flashcards/               Flashcards.tsx, queue.ts, queue.test.ts, sample.ts
src/pages/Desk.tsx                 Home page composition
src/pages/Hero/index.tsx           Replaces src/pages/Home.tsx
src/pages/Products/                index.tsx (home stop), ProductCard.tsx, ProductType.ts
src/pages/ProductPage/index.tsx    The product page template
src/pages/NotFound.tsx             404
src/pages/Skills/                  Deleted in Task 8
```

---

### Task 1: Routes, product data and a plain product page

**Files:**

- Create: `src/mocks/products.ts`, `src/pages/Products/ProductType.ts`,
  `src/pages/Products/index.tsx`, `src/pages/Products/ProductCard.tsx`,
  `src/pages/ProductPage/index.tsx`, `src/pages/NotFound.tsx`,
  `src/pages/Desk.tsx`
- Modify: `package.json`, `src/main.tsx`, `src/App.tsx`, `src/pages/index.ts`,
  `src/mocks/projects.ts`, `src/mocks/pages.ts`,
  `src/pages/Experiences/index.tsx`, `src/layout/Navigation/index.tsx`,
  `src/layout/Navigation/NavItem.tsx`, `vite.config.ts`, `.gitignore`

**Interfaces:**

- Produces:
  - `interface Product` in `ProductType.ts`, exactly the shape in spec
    section 5, with `toy?: ToyKey` and `export type ToyKey = 'receipt' | 'flashcards'`.
  - `export const PRODUCTS: Product[]` and
    `export const findProduct = (slug: string): Product | undefined` in
    `src/mocks/products.ts`. This file imports types only (the Vercel function
    imports it in Task 9).
  - Slugs: `ff-restaurent`, `linguflow`. Section ids on `/`: `home`,
    `products`, `projects`, `experience`, `blog`, `about`.
  - `NAV_PAGES`: `#products` "Products", `#experience` "Work", `#blog`
    "Notes", `#about` "About".
  - Routes: `/` -> `Desk`, `/products/:slug` -> `ProductPage`, `*` ->
    `NotFound`. `ProductPage` renders `NotFound` for an unknown slug.

- [ ] **Step 1: Branch and install.** `git switch -c feat/phivo-dev` from
      `design/phivo-dev`; `npm install react-router@^7`.

- [ ] **Step 2: Create `ProductType.ts` and `products.ts`.** Fill both
      entries with the links and health URLs from the spec's "Known values"
      table. Move `title`, `period`, images and `technologies` (as
      `story.stack`) from the two entries in `projects.ts`, then delete those
      two from `projects.ts`. Rewrite the hosting words: both run on one VPS
      with Docker Compose, frontends on Vercel; remove Cloud Run, Cloud SQL
      and Railway. Draft `tagline`, `pitch`, `story.why`, three `story.steps`
      and two or three `story.changelog` rows per product from the existing
      descriptions, and put `// DRAFT: Phi to review` above each drafted
      block. Step images reuse the existing screenshots until Phi supplies
      more.

- [ ] **Step 3: Router.** `src/main.tsx` wraps `<App />` in `BrowserRouter`.
      `src/App.tsx` keeps `Navigation`, `Footer` and `ContactBubble` around
      `<Routes>`. `Desk.tsx` holds what `App.tsx` rendered before, in this
      order: `Home`, `Products`, `Projects`, `Experiences`, `Skills`,
      `Education`, `Badges`, `Blog`, `About` (sections are removed or
      restyled in later tasks).

- [ ] **Step 4: Home stop and page template, unstyled but complete.**
      `Products` (section id `products`) maps `PRODUCTS` to `ProductCard`:
      name, pitch, primary "Try it" link (external, `rel="noreferrer"`), and
      a router link "Read the story" to `/products/${slug}`. `ProductPage`
      renders the spec's blocks in order and skips a block whose data is
      empty: pitch and links; why; steps; stack; changelog; "try it" and next
      product (wraps around; hidden when there is one product).

- [ ] **Step 5: Navigation off the home page.** `NavItem` gets
      `onHome: boolean`. When false it renders a router
      `<Link to={{ pathname: '/', hash: href }}>` with the same classes and no
      scroll spy. `Navigation` passes `onHome = pathname === '/'`; the logo
      link does the same for `#home`. `Desk` scrolls to `location.hash` on
      mount (instant when reduced motion is on). Navigating to a product
      page scrolls to top.

- [ ] **Step 6: Experience keeps both products on its chart.** In
      `src/pages/Experiences/index.tsx`, `SIDE_PROJECTS` is built from
      `[...PRODUCTS.map(p => ({ title: p.name, period: p.period })), ...PROJECTS]`.

- [ ] **Step 7: Vendor chunk.** Add `react-router` to the `vendor` regex in
      `vite.config.ts`.

- [ ] **Step 8: Verify.** `npm run build && npm run lint` pass. With
      `npm run dev`: `/` shows the new Products stop; both product pages
      render every block; `/products/nope` and `/nope` show the 404; nav
      links on a product page land on the right home section; the Experience
      chart still shows LinguFlow and FF RESTaurent.

- [ ] **Step 9: Commit.** `feat(products): add routes, product data and a product page template`

---

### Task 2: Prerendering, page metadata and the 404

**Files:**

- Create: `src/entry-server.tsx`, `src/seo/meta.ts`, `src/lib/buildDate.ts`,
  `scripts/prerender.mjs`, `vercel.json`
- Modify: `index.html`, `src/main.tsx`, `package.json`, `vite.config.ts`,
  `src/pages/Experiences/period.ts`, `src/layout/Footer.tsx`,
  `src/vite-env.d.ts`
- Delete: `public/sitemap.xml`, `public/robots.txt` (now generated)

**Interfaces:**

- Consumes: `PRODUCTS`, `findProduct` (Task 1).
- Produces:
  - `src/seo/meta.ts`: `export const SITE_URL = 'https://phivo.dev'`;
    `export interface PageMeta { title: string; description: string; canonical: string; image: string }`;
    `export const getMeta = (pathname: string): PageMeta`. Home title
    `Phi Vo: maker of FF RESTaurent and LinguFlow`; product title
    `${name}: ${tagline} | Phi Vo`; unknown path title `Not found | Phi Vo`.
    `image` is `${SITE_URL}/og/home.png` or `${SITE_URL}/og/${slug}.png`.
  - `src/entry-server.tsx`: `export const render = (url: string): string`
    (`renderToString` with `StaticRouter`), `export const staticPaths = (): string[]`
    (`'/'` plus one per product), and re-exports `getMeta`, `PRODUCTS`.
  - `src/lib/buildDate.ts`: `export const BUILD_DATE: Date`, read from
    `__BUILD_DATE__`, a string Vite injects through `define`.
  - `index.html` placeholders: `<!--app-head-->` and `<!--app-html-->`.

- [ ] **Step 1: One date for server and client.** `vite.config.ts` defines
      `__BUILD_DATE__` as `JSON.stringify(new Date().toISOString())`; declare
      it in `src/vite-env.d.ts`. `parsePeriod`'s default `now` and the footer
      year use `BUILD_DATE`, so prerendered HTML and hydration agree.

- [ ] **Step 2: `index.html`.** Remove the hard-coded title, description,
      canonical, Open Graph and Twitter tags and put `<!--app-head-->` in
      their place. Change every `porfolio-seven-dun.vercel.app` in the
      JSON-LD block to `phivo.dev`. Put `<!--app-html-->` inside `#root`.

- [ ] **Step 3: `getMeta` and `entry-server.tsx`.** As in Interfaces. `App`
      and everything it renders must not touch `window`, `document` or
      `localStorage` during render; `src/pages/Home.tsx` does (it is replaced
      in Task 4, so for now guard its three browser reads with
      `typeof window`).

- [ ] **Step 4: `src/main.tsx`.** `hydrateRoot` when `#root` has element
      children, otherwise `createRoot` (dev). After each route change set
      `document.title = getMeta(pathname).title`.

- [ ] **Step 5: `scripts/prerender.mjs`.** Imports
      `dist-ssr/entry-server.js`. For each path in `staticPaths()` and for
      `/404`: replace `<!--app-html-->` with `render(path)` and
      `<!--app-head-->` with title, description, canonical, `og:*` and
      `twitter:*` tags from `getMeta(path)`; write `dist/index.html`,
      `dist/products/<slug>/index.html` and `dist/404.html`. Write
      `dist/sitemap.xml` (one `<loc>` per static path on `SITE_URL`) and
      `dist/robots.txt` (allow all, sitemap line). Then assert, and exit 1
      with a clear message on failure:
  - `dist/index.html` contains every product's `name` and primary link `href`;
  - each product page contains its `name` and `tagline`;
  - `dist/404.html` contains `Nothing on the desk here`;
  - no output file still contains `<!--app-`.

- [ ] **Step 6: Build script.** `"build": "tsc -b && vite build && vite build --ssr src/entry-server.tsx --outDir dist-ssr && node scripts/prerender.mjs"`.
      `dist-ssr` is already ignored by git; add it to the ESLint `ignores`.

- [ ] **Step 7: `vercel.json`.** `{ "cleanUrls": true, "trailingSlash": false }`.

- [ ] **Step 8: Verify.** `npm run build` passes and prints the written
      files. `npm run preview`: view source on `/` and on
      `/products/linguflow` shows real content and the right `<title>`; the
      browser console has no hydration warnings on either page; `npm run dev`
      still works.

- [ ] **Step 9: Commit.** `feat(seo): prerender routes with per-page metadata and a 404`

---

### Task 3: Motion primitives and desk tokens

**Files:**

- Create: `src/components/motion/Reveal.tsx`, `Pickup.tsx`, `Flip.tsx`,
  `Tear.tsx`, `ScrollSteps.tsx`, `Typewriter.tsx`, `index.ts`
- Modify: `src/App.css`, `src/App.tsx`, `src/pages/About/index.tsx`,
  `src/pages/ProductPage/index.tsx`
- Delete: `src/pages/About/Terminal.tsx` (moved to `Typewriter.tsx`)

**Interfaces:**

- Produces (all exported from `src/components/motion/index.ts`):
  - `Reveal(props: { children: ReactNode; delay?: number; className?: string })`:
    fades and rises 16 px once when 30% in view.
  - `Pickup(props: { children: ReactNode; rotate?: number; drag?: boolean; className?: string })`:
    rests at `rotate` degrees; lifts and straightens on hover and focus-within;
    with `drag`, can be dragged and springs back.
  - `Flip(props: { flipped: boolean; front: ReactNode; back: ReactNode; className?: string })`:
    the hidden face is `aria-hidden` and `inert`.
  - `Tear(props: { torn: boolean; pieces: ReactNode[]; className?: string })`:
    pieces sit flush when `torn` is false and spread with small alternating
    rotations when true.
  - `ScrollSteps(props: { steps: { title: string; text: string; media: ReactNode }[] })`:
    from the `md` breakpoint the media column is sticky and shows the media of
    the step nearest the viewport centre; below `md`, and with reduced motion,
    each step is a normal stacked block with its own media.
  - `Command`, `Output`, `type Step`: the current `Terminal.tsx` exports,
    unchanged.
- Each component reads framer-motion's `useReducedMotion()` and, when it is
  true, renders the end state with no transition. `App` wraps its tree in
  `<MotionConfig reducedMotion="user">`.

- [ ] **Step 1: Tokens.** Add to `@theme` in `src/App.css`, each with a
      light and dark value chosen to sit with the existing greys:
      `--color-desk-light/-dark` (page surface behind objects),
      `--color-receipt-light/-dark`, `--color-receipt-ink-light/-dark`,
      `--color-card-light/-dark`, `--color-card-edge-light/-dark`. Add one
      plain-CSS class `.desk-surface` (subtle grain using gradients only, no
      image file).

- [ ] **Step 2: Write the six primitives** to the interfaces above.

- [ ] **Step 3: Use two of them now.** `About` imports `Command` / `Output`
      from `components/motion`. `ProductPage` renders its steps with
      `ScrollSteps` and wraps other blocks in `Reveal`.

- [ ] **Step 4: Verify.** Build and lint pass. In the browser: About types
      as before; a product page pins and swaps the media on a wide window and
      stacks on a 390 px wide window. With the OS "reduce motion" setting on,
      nothing moves and all content is visible.

- [ ] **Step 5: Commit.** `feat(motion): add shared motion primitives and desk tokens`

---

### Task 4: The new hero

**Files:**

- Create: `src/pages/Hero/index.tsx`
- Modify: `src/pages/Desk.tsx`, `src/pages/index.ts`,
  `src/constants/self-information.ts`, `vite.config.ts`, `package.json`
- Delete: `src/pages/Home.tsx`

**Interfaces:**

- Consumes: `PRODUCTS`, `Pickup`, `Reveal`.
- Produces: `Hero` (section id `home`) with one slot per product,
  `<div data-toy-slot={slug}>`, that Task 5 fills. Until then each slot shows
  the product screenshot inside `Pickup`.
- `export const HERO_LINE = 'Phi Vo builds small tools that teams use every day.'`
  in `self-information.ts` (draft; Phi may change the words).

- [ ] **Step 1: Build `Hero`.** Mockup option A: `HERO_LINE` as the `h1`;
      under it `JOB_TITLE` and "Two products live. Play with them." Then the
      product slots: side by side from `md`, stacked below it, each with the
      product name and a "Try it" link. The section uses `.desk-surface`. No
      entrance animation delays the slots. The hero fits a 390 × 844 viewport
      with the first slot at least half visible.

- [ ] **Step 2: Remove tsParticles.** Delete `Home.tsx`, uninstall
      `@tsparticles/react` and `@tsparticles/slim`, remove the `particles`
      chunk group and the `allowScripts` entry for `@tsparticles/engine`.
      Remove `GREETINGS` if nothing uses it. Keep `react-confetti` (Badges
      uses it).

- [ ] **Step 3: Verify.** Build and lint pass; the build output has no
      `particles` chunk. Check the hero at 390 px and 1440 px, light and dark.

- [ ] **Step 4: Commit.** `feat(hero): replace the particle hero with the desk and product slots`

---

### Task 5: Toy loading

**Files:**

- Create: `src/toys/registry.ts`, `src/toys/ToySlot.tsx`
- Modify: `src/pages/Hero/index.tsx`, `src/pages/Products/ProductCard.tsx`

**Interfaces:**

- Consumes: `Product`, `ToyKey`.
- Produces:
  - `src/toys/registry.ts`:
    `export const TOYS: Record<ToyKey, LazyExoticComponent<ComponentType>>`.
    Until Tasks 6 and 7 land, each key lazy-loads a stub that renders the
    product screenshot.
  - `ToySlot(props: { product: Product })`: renders a fixed-size box (the same
    size on server and client). It shows the product's framed screenshot
    until the box is within 200 px of the viewport, then mounts
    `TOYS[product.toy]` inside `Suspense` and an error boundary, both of which
    fall back to the screenshot. A product without `toy` always shows the
    screenshot.

- [ ] **Step 1: Write `registry.ts` and `ToySlot.tsx`.**
- [ ] **Step 2: Use `ToySlot` in the hero slots.** `ProductCard` in the
      Products stop shows text and links only, so each toy appears once.
- [ ] **Step 3: Verify.** Build passes and lists one chunk per toy stub. In
      the browser's network panel the toy chunks load only when the slot is
      near the viewport. Block one toy chunk in devtools and reload: the
      screenshot stays and the page works. No layout shift when a toy mounts.
- [ ] **Step 4: Commit.** `feat(toys): add the toy registry and in-view loader`

---

### Task 6: The receipt toy (FF RESTaurent)

**Files:**

- Create: `src/toys/receipt/split.ts`, `src/toys/receipt/split.test.ts`,
  `src/toys/receipt/sample.ts`, `src/toys/receipt/Receipt.tsx`
- Modify: `src/toys/registry.ts`, `package.json`, `tsconfig.app.json`,
  `tsconfig.node.json`

**Interfaces:**

- Consumes: `Tear`, `Pickup`.
- Produces:
  - `export interface Dish { id: string; name: string; price: number; eaters: string[] }`
  - `export const splitBill = (dishes: Dish[], people: string[]): Record<string, number>`
  - `export const formatVnd = (amount: number): string` (`75000` -> `'75.000 đ'`)
  - default export `Receipt` (the lazy toy).

- [ ] **Step 1: Test setup.** `npm install -D @types/node`. Add
      `"test": "node --test \"src/**/*.test.ts\" \"api/**/*.test.ts\""`.
      Exclude `src/**/*.test.ts` from `tsconfig.app.json`; in
      `tsconfig.node.json` add `"types": ["node"]` and include
      `src/**/*.test.ts` and `api`. Test files import with the `.ts`
      extension.

- [ ] **Step 2: Write the failing test** in `split.test.ts`:

```ts
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { splitBill, formatVnd } from './split.ts';

const people = ['An', 'Bình', 'Chi', 'Dũng'];
const dishes = [
  { id: 'pho', name: 'Phở bò ×4', price: 240000, eaters: [] },
  { id: 'goi', name: 'Gỏi cuốn', price: 60000, eaters: ['An', 'Bình'] },
  { id: 'tra', name: 'Trà đá', price: 10000, eaters: ['Chi', 'Dũng', 'An'] },
  { id: 'che', name: 'Chè ba màu', price: 25000, eaters: ['Dũng'] },
];

test('splits each dish among its eaters, and unassigned dishes among everyone', () => {
  assert.deepEqual(splitBill(dishes, people), {
    An: 93333,
    Bình: 90000,
    Chi: 63334,
    Dũng: 88333,
  });
});

test('shares always add up to the total', () => {
  const shares = splitBill(dishes, people);
  const sum = Object.values(shares).reduce((a, b) => a + b, 0);
  assert.equal(sum, 335000);
});

test('a person with no dishes owes 0 and still appears', () => {
  const shares = splitBill(
    [{ id: 'che', name: 'Chè', price: 25000, eaters: ['An'] }],
    ['An', 'Bình']
  );
  assert.deepEqual(shares, { An: 25000, Bình: 0 });
});

test('eaters who are not in the people list are ignored', () => {
  const shares = splitBill(
    [{ id: 'x', name: 'X', price: 10000, eaters: ['Ghost'] }],
    ['An', 'Bình']
  );
  assert.deepEqual(shares, { An: 5000, Bình: 5000 });
});

test('no people gives an empty result', () => {
  assert.deepEqual(splitBill(dishes, []), {});
});

test('formats đồng with dots', () => {
  assert.equal(formatVnd(75000), '75.000 đ');
  assert.equal(formatVnd(0), '0 đ');
});
```

- [ ] **Step 3: Run it.** `npm test`. Expected: FAIL, cannot find
      `./split.ts`.

- [ ] **Step 4: Implement `splitBill` and `formatVnd`.** Whole đồng only. A
      dish is divided by integer division among its valid eaters (everyone
      when there are none); the remainder is handed out one đồng at a time in
      the order of the dish's `eaters` (or of `people` when unassigned).
      `formatVnd` builds the string itself (no `toLocaleString`, so server
      and client always agree).

- [ ] **Step 5: Run it.** `npm test`. Expected: PASS, 6 tests.

- [ ] **Step 6: Build `Receipt.tsx`.** Receipt paper (`receipt-*` tokens,
      `font-mono`, torn bottom edge in CSS) listing the sample dishes with
      prices and a total. Under each dish, one toggle button per person
      (`aria-pressed`) to mark who ate it. A "Tear to split" button sets
      `torn`; `Tear` then shows one strip per person with their name and
      `formatVnd(share)`. "Print again" resets. A visually hidden
      `aria-live="polite"` region reads the shares after tearing. Sample data
      lives in `sample.ts`: four people and four or five Vietnamese dishes.
      Point `TOYS.receipt` at this component.

- [ ] **Step 7: Verify.** Build, lint and tests pass. In the browser, using
      only the keyboard: tab to a dish, toggle people, tear, hear or see the
      shares, print again. Repeat by touch at 390 px. With reduced motion the
      strips appear already apart.

- [ ] **Step 8: Commit.** `feat(toys): add the receipt bill-splitting toy`

---

### Task 7: The flashcard toy (LinguFlow)

**Files:**

- Create: `src/toys/flashcards/queue.ts`, `src/toys/flashcards/queue.test.ts`,
  `src/toys/flashcards/sample.ts`, `src/toys/flashcards/Flashcards.tsx`
- Modify: `src/toys/registry.ts`

**Interfaces:**

- Consumes: `Flip`, `Pickup`.
- Produces:
  - `export type Rating = 'again' | 'good'`
  - `export const rate = <T>(queue: readonly T[], rating: Rating): T[]`
    (the card being rated is `queue[0]`)
  - default export `Flashcards`.

- [ ] **Step 1: Write the failing test** in `queue.test.ts`:

```ts
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { rate } from './queue.ts';

test('"good" sends the card to the back', () => {
  assert.deepEqual(rate(['a', 'b', 'c', 'd'], 'good'), ['b', 'c', 'd', 'a']);
});

test('"again" brings the card back after two others', () => {
  assert.deepEqual(rate(['a', 'b', 'c', 'd'], 'again'), ['b', 'c', 'a', 'd']);
});

test('"again" with fewer than three cards puts it last', () => {
  assert.deepEqual(rate(['a', 'b'], 'again'), ['b', 'a']);
  assert.deepEqual(rate(['a'], 'again'), ['a']);
});

test('an empty queue stays empty and the input is not mutated', () => {
  const queue = ['a', 'b'];
  assert.deepEqual(rate([], 'good'), []);
  rate(queue, 'good');
  assert.deepEqual(queue, ['a', 'b']);
});
```

- [ ] **Step 2: Run it.** `npm test`. Expected: FAIL, cannot find
      `./queue.ts`.
- [ ] **Step 3: Implement `rate`.**
- [ ] **Step 4: Run it.** `npm test`. Expected: PASS.

- [ ] **Step 5: Build `Flashcards.tsx`.** A stack of about six cards
      (`card-*` tokens; the cards behind show as offset edges). Each card in
      `sample.ts` has `front`, `back` and a small exam tag (TOEIC, IELTS, HSK,
      JLPT or Tiếng Việt). The stack is one focusable group
      (`role="group"`, `aria-roledescription="flashcard"`, `tabIndex={0}`).
      Keys act only while the group has focus: `Space` or `Enter` flips,
      `ArrowRight` rates `good`, `ArrowLeft` rates `again`; `Space` must not
      scroll the page. Visible buttons "Flip", "Again" and "Good" do the
      same; rating is disabled until the card is flipped. A horizontal swipe
      on a flipped card rates it (right is good). A key hint row shows the
      keys on devices with a fine pointer only. A polite live region reads
      the revealed back and the rating. Point `TOYS.flashcards` at this
      component.

- [ ] **Step 6: Verify.** Build, lint and tests pass. Keyboard only: focus
      the stack, flip, rate both ways, and confirm an "again" card returns
      after two others. Arrow keys and `Space` do nothing to the toy when
      focus is elsewhere. Touch at 390 px works. Reduced motion: faces swap
      with no turn.

- [ ] **Step 7: Commit.** `feat(toys): add the flashcard toy`

---

### Task 8: The lean desk

**Files:**

- Modify: `src/pages/Desk.tsx`, `src/App.tsx`, `src/pages/Projects/index.tsx`,
  `src/pages/Projects/ProjectPiece.tsx`, `src/pages/Experiences/index.tsx`,
  `src/pages/Education/index.tsx`, `src/pages/About/index.tsx`,
  `src/layout/ContactBubble.tsx`, `src/pages/Products/index.tsx`,
  `src/pages/Products/ProductCard.tsx`, `src/App.css`, `index.html`,
  `vite.config.ts`
- Delete: `src/pages/Skills/` (all files), `src/mocks/skills.ts` if nothing
  else imports it

**Interfaces:**

- Consumes: `Reveal`, `Pickup`, section ids from Task 1.
- Produces: `openContact(): void` exported from `src/layout/ContactBubble.tsx`
  (dispatches a `contact:open` window event the bubble listens for).

- [ ] **Step 1: Order.** `Desk` renders `Hero`, `Products`, `Projects`,
      `Experiences`, `Education`, `Badges` (only when `BADGES.length > 0`),
      `Blog`, `About`. Remove the `Skills` lazy import and its placeholder.

- [ ] **Step 2: Remove Skills.** Delete the folder. Remove the
      `Architects Daughter` family from the Google Fonts link in `index.html`
      and `--font-sketch` from `@theme` once a search for `font-sketch` finds
      no other use.

- [ ] **Step 3: "Also on the desk".** `Projects` keeps id `projects`, its
      heading becomes "Also on the desk", the oversized featured piece goes,
      and all three projects use the smaller two-column hang.

- [ ] **Step 4: The notebook.** `Experiences` heading becomes "Work" with the
      same intro idea. `Education` loses its full-height layout and reads as
      the notebook's short last page directly under the roles. Badges stay
      as they are.

- [ ] **Step 5: Terminal contact line.** After the fun facts, `About` types a
      fourth command, `contact --open`, whose output is a real `<button>`
      ("Write to me") that calls `openContact()` and moves focus into the
      bubble's form.

- [ ] **Step 6: Desk pass.** Hero, Products and Projects sit on
      `.desk-surface`; product cards and prints use `Pickup` with small
      alternating rotations; sections use `Reveal` in place of their ad hoc
      `whileInView` fades where the code is touched anyway.

- [ ] **Step 7: Easter eggs (optional).** The spec lists three. Build only
      these two, and drop either if it costs more than about 30 lines: a
      faint coffee ring (CSS only) left where a `Pickup` object rested while
      it is lifted; and in the receipt toy, dragging the receipt outside its
      slot prints a fresh one. The terminal `help` command is skipped,
      because the terminal takes no input.

- [ ] **Step 8: Verify.** Build, lint and tests pass; the build has no Skills
      chunk. Nav shows Products, Work, Notes, About and each lands correctly.
      Tab through the whole home page with the keyboard: order is sensible
      and focus is always visible. Check 390 px and 1440 px, light and dark,
      and reduced motion.

- [ ] **Step 9: Commit.** `feat(desk): slim the home page to five stops and fold Skills into Work`

---

### Task 9: Status lamp and analytics

**Files:**

- Create: `src/lib/status.ts`, `src/lib/status.test.ts`, `api/status.ts`,
  `src/hooks/useProductStatus.ts`, `src/components/StatusLamp.tsx`
- Modify: `src/pages/Products/ProductCard.tsx`,
  `src/pages/ProductPage/index.tsx`, `src/App.tsx`, `package.json`

**Interfaces:**

- Consumes: `PRODUCTS` (`slug`, `health`).
- Produces:
  - `export type Health = 'up' | 'down'`
  - `export const checkHealth = (url: string, fetchImpl?: typeof fetch, timeoutMs?: number): Promise<Health>`
    (default timeout 3000)
  - `export const parseStatus = (body: unknown, slugs: string[]): Record<string, Health> | null`
  - `api/status.ts`: `export async function GET(): Promise<Response>`
  - `useProductStatus(): Record<string, Health> | null` and
    `StatusLamp(props: { slug: string })`.

- [ ] **Step 1: Write the failing test** in `src/lib/status.test.ts`:

```ts
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { checkHealth, parseStatus } from './status.ts';

const respond = (status: number) => async () => new Response('', { status });

test('200 is up, anything else is down', async () => {
  assert.equal(await checkHealth('https://x/health', respond(200)), 'up');
  assert.equal(await checkHealth('https://x/health', respond(503)), 'down');
  assert.equal(await checkHealth('https://x/health', respond(404)), 'down');
});

test('a thrown error is down', async () => {
  const boom = async () => {
    throw new Error('network');
  };
  assert.equal(await checkHealth('https://x/health', boom), 'down');
});

test('a hung request is down after the timeout', async () => {
  const hang = (_url: string | URL | Request, init?: RequestInit) =>
    new Promise<Response>((_resolve, reject) => {
      init?.signal?.addEventListener('abort', () =>
        reject(new Error('aborted'))
      );
    });
  assert.equal(await checkHealth('https://x/health', hang, 50), 'down');
});

test('parseStatus accepts only a complete, well-formed answer', () => {
  const slugs = ['ff-restaurent', 'linguflow'];
  assert.deepEqual(
    parseStatus({ 'ff-restaurent': 'up', linguflow: 'down' }, slugs),
    { 'ff-restaurent': 'up', linguflow: 'down' }
  );
  assert.equal(parseStatus('<!doctype html>', slugs), null);
  assert.equal(parseStatus(null, slugs), null);
  assert.equal(parseStatus({ 'ff-restaurent': 'up' }, slugs), null);
  assert.equal(
    parseStatus({ 'ff-restaurent': 'up', linguflow: 'maybe' }, slugs),
    null
  );
});
```

- [ ] **Step 2: Run it.** `npm test`. Expected: FAIL, cannot find
      `./status.ts`.
- [ ] **Step 3: Implement `src/lib/status.ts`.** No imports; `checkHealth`
      uses `AbortController`.
- [ ] **Step 4: Run it.** `npm test`. Expected: PASS.

- [ ] **Step 5: `api/status.ts`.** Checks every product that has `health`, in
      parallel, and returns JSON `{ [slug]: Health }` with status 200 and
      `Cache-Control: public, s-maxage=60, stale-while-revalidate=30`. It
      imports `../src/mocks/products.js` and `../src/lib/status.js` with the
      `.js` extension (the package is ESM, and Vercel does not resolve
      extensionless relative imports in functions).

- [ ] **Step 6: Client.** `useProductStatus` fetches `/api/status` once per
      page load (a module-level promise shared by all lamps), with a 4 second
      abort, and returns `parseStatus(...)` or `null` on any failure.
      `StatusLamp` renders nothing for `null` or an unknown slug; a `brand-2`
      dot with the text "live" for `up`; a muted dot with "having a moment"
      for `down`. The dot's pulse is CSS and stops under reduced motion. The
      lamp never renders on the server, so it cannot cause a hydration
      mismatch. Place it in `ProductCard` and at the top of `ProductPage`.

- [ ] **Step 7: Analytics.** `npm install @vercel/analytics`; render
      `<Analytics />` from `@vercel/analytics/react` once in `App`. Phi (or
      Claude with Phi's OK) enables Web Analytics for the project in the
      Vercel dashboard.

- [ ] **Step 8: Verify locally.** Build, lint and tests pass. In
      `npm run dev` there is no `/api/status`: no lamp shows and the console
      has no uncaught error.

- [ ] **Step 9: Verify on a preview deployment** (needs Phi's OK to push the
      branch). `GET /api/status` on the preview address returns
      `{"ff-restaurent":"up","linguflow":"up"}` with the cache header, and
      both lamps show "live". If the function fails to load its imports,
      stop and report; do not work around it by copying the health URLs into
      the function.

- [ ] **Step 10: Commit.** `feat(status): add the product status lamp and web analytics`

---

### Task 10: Share cards

**Files:**

- Create: `scripts/build-og.mjs`, `scripts/fonts/BricolageGrotesque-Bold.ttf`
  (from the Google Fonts repository, SIL Open Font License; add its
  `OFL.txt` beside it)
- Modify: `package.json`

**Interfaces:**

- Consumes: `PRODUCTS`, `getMeta` and `HERO_LINE` from
  `dist-ssr/entry-server.js` (add the `HERO_LINE` re-export to
  `src/entry-server.tsx` in this task).
- Produces: `dist/og/home.png` and `dist/og/<slug>.png`, each 1200 × 630,
  matching the `image` addresses `getMeta` already returns.

- [ ] **Step 1: Install.** `npm install -D satori @resvg/resvg-js`.
- [ ] **Step 2: Write `scripts/build-og.mjs`.** One layout for every card:
      desk-grey background, the title in Bricolage Grotesque Bold
      (`HERO_LINE` for home, the product `name` and `tagline` for products),
      "phivo.dev" in the corner, and a `brand` accent bar. Colours are read
      from constants at the top of the script that mirror the `@theme`
      values. It exits 1 if any expected file is missing or is not
      1200 × 630.
- [ ] **Step 3: Chain it.** Append `&& node scripts/build-og.mjs` to the
      `build` script.
- [ ] **Step 4: Verify.** `npm run build` passes; open the three PNGs and
      check the text is not clipped. If the native `resvg` binary fails in
      Vercel's build (seen on the preview deployment), switch to the spec's
      fallback: commit the three PNGs under `public/og/` and drop the script
      from `build`.
- [ ] **Step 5: Commit.** `feat(seo): generate share cards from product data`

---

### Task 11: Budget check and docs

**Files:**

- Modify: `README.md`, `CLAUDE.md`, `AGENTS.md`

- [ ] **Step 1: Measure.** From `npm run build` output, add the gzipped
      sizes of the JavaScript that `dist/index.html` loads before
      interaction (entry and vendor chunks, not toy, emailjs or confetti
      chunks). It must be 150 KB or less. Run Lighthouse (mobile) against
      `npm run preview` on `/`: performance 90 or more, layout shift under
      0.1. If either fails, fix the largest contributor before continuing
      and report what it was.
- [ ] **Step 2: Docs.** Update the three files for the new shape: routes,
      `src/mocks/products.ts` and how to add a product (one entry, optional
      toy in `src/toys/registry.ts`), the toys, the motion primitives, the
      prerender and share-card build steps, `npm test`, the status function,
      the removed Skills section and tsParticles, and `https://phivo.dev` as
      the live address. `CLAUDE.md` and `AGENTS.md` keep identical bodies.
- [ ] **Step 3: Commit.** `docs: describe the phivo.dev site structure`
- [ ] **Step 4: Hand back to Phi.** Report the measured numbers and ask Phi
      to review the drafted product copy (search for `DRAFT: Phi to review`)
      and the hero line. The merge to `main` waits for Phi's explicit OK.

---

### Task 12: Domain (after the merge to `main` is live)

Every step here is outward-facing. Do each only with Phi's OK at that step,
and record nothing sensitive.

- [ ] **Step 1:** Add `phivo.dev` and `www.phivo.dev` to the Vercel project
      `porfolio`; set `phivo.dev` as primary and `www` to redirect to it.
- [ ] **Step 2:** Read the DNS records Vercel asks for (apex and `www`) and
      give them to Phi exactly as shown, to enter in Cloudflare as DNS only
      (grey cloud). Claude does not touch DNS.
- [ ] **Step 3:** After Phi confirms, verify: `https://phivo.dev/` returns
      200 with a valid certificate; `https://www.phivo.dev/` redirects to it;
      `/products/ff-restaurent`, `/products/linguflow`, `/api/status`,
      `/sitemap.xml` and `/og/home.png` return 200; `/nope` returns 404.
- [ ] **Step 4:** Confirm the eight existing hostnames still answer as before
      (`restaurant`, `restaurant-staging`, `lingu`, `lingu-staging` and the
      four `-api` hosts).
- [ ] **Step 5:** Add a dated note in the Obsidian vault under
      `lab_projects\_vps\` listing the two new records (no IP addresses or
      logins), next to `06 - phivo.dev Domain.md`.

---

### Task 13: Renames (last, once the domain is stable)

Each step needs Phi's OK at that step.

- [ ] **Step 1:** `git remote rename orgin origin` (local only).
- [ ] **Step 2:** Rename the GitHub repo `Porfolio` to `phivo.dev`, then
      `git remote set-url origin https://github.com/newtc22222/phivo.dev.git`.
      Confirm the Vercel project still shows the Git connection and that a
      test push to a branch creates a preview.
- [ ] **Step 3:** Check in Vercel what renaming the project does to
      `porfolio-seven-dun.vercel.app`, tell Phi, and only then rename the
      project to `phivo-dev`.
- [ ] **Step 4:** Set `"name": "phivo-dev"` in `package.json`, update the
      repo address in the README, and commit:
      `chore: rename the project to phivo.dev`.
