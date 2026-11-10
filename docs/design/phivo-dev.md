# phivo.dev: design

Status: approved by Phi on 2026-11-10.

Labels used below: **Agreed** means Phi chose it during the brainstorm.
**My call** means Claude chose it and Phi has not confirmed it; object to any
of these while reading.

## 1. Intent

Turn the portfolio into Phi's personal site at `https://phivo.dev`. A visitor
should leave thinking "this person ships real products". The visitors are
peers, potential collaborators and hiring managers. Hiring is a second
outcome, not the main one. (Agreed: "builder first, hiring second".)

## 2. Goals, non-goals and anti-goals

**Goals**

- Both products are playable within the first five seconds of the home page.
- Each product has its own page and its own shareable link.
- Adding a third product means adding one data entry (and optionally one toy
  component), not building a page.
- Motion is playful, but the site is fast on a mid-range phone, keyboard
  usable, and honours `prefers-reduced-motion`.

**Non-goals**

- A Vietnamese translation (English only at launch).
- Embedding the real apps, demo accounts, or any change to the product apps.
- Any change to the VPS, its env files or Caddy.
- A CMS, a blog engine or a test suite.

**Anti-goals** (these make the site a failure even if it works)

- It reads as a standard portfolio template or as a CV with products attached.
- The desk metaphor becomes a heavy illustrated scene that is slow or
  confusing on a phone.
- A toy that only works with a mouse, or motion that cannot be turned off.
- A status lamp that shows a product as broken when only the lamp is broken.

## 3. Concept: the maker's desk (Agreed)

The site is Phi's workspace and each thing on it is an object:

| Object          | Content                               | Built from                                      |
| --------------- | ------------------------------------- | ----------------------------------------------- |
| Receipt         | FF RESTaurent                         | new toy                                         |
| Flashcard stack | LinguFlow                             | new toy                                         |
| Framed prints   | the other projects                    | existing Projects gallery wall                  |
| Notebook        | Experience, Skills, Education, Badges | existing Experience and Education (ruled paper) |
| Graph pad       | Blog                                  | existing Blog, unchanged in structure           |
| Laptop terminal | About and contact                     | existing About terminal                         |

The desk is the surface and texture of the page (colour, grain, soft shadows,
slight rotation of objects). It is not a full illustrated scene and there is
no camera that travels across it.

My calls:

- Existing sections are restyled as desk objects, not rebuilt.
- The tsParticles hero background and `react-confetti` are removed if nothing
  else uses them.
- New desk tokens (`desk-*`, `receipt-*`, `card-*`) go in the `@theme` block
  of `src/App.css`, with light and dark pairs, following the repo's `brand` /
  `brand-2` contrast rule.

## 4. Structure (Agreed)

Routes:

- `/`: the desk, one scroll.
- `/products/:slug`: one page per product, rendered by a single template.
- Anything else: a small "nothing on the desk here" 404 page (my call).

Home page, in order:

1. **Hero.** One plain sentence about Phi, with the two product toys playable
   straight away (mockup option A). No intro animation delays the toys.
2. **Products.** Each product: name, two-line pitch, status lamp, "try it"
   link and a link to its page. On wide screens the hero toys and this stop
   may be one continuous area; the builder decides the exact split.
3. **Also on the desk.** Laptech Store, Technical Documents and Web Notes as
   smaller framed prints, reusing the gallery-wall pieces.
4. **The notebook.** Experience (overview chart and roles). Skills is no
   longer its own section: each role keeps its stack list, which already
   exists. Education is a short last page. Badges appear only when
   `BADGES.length > 0`, as today.
5. **Graph pad, then terminal.** Blog, then About. The contact bubble stays
   as it is; the terminal gains a `contact` line that opens it (my call).

Navigation (my call): Products, Work, Notes, About. `NAV_PAGES` in
`src/mocks/pages.ts` stays the single source. On a product page the nav links
go back to the matching home anchors.

Removed: the standalone Skills section (`src/pages/Skills`, the stack diagram
and `font-sketch` if nothing else uses it).

## 5. Products

### Data model (Agreed: data-driven, one entry per product)

A new `src/mocks/products.ts`. The two products move out of
`src/mocks/projects.ts`, which keeps the other three. Proposed shape (my
call, the builder may adjust names):

```ts
interface Product {
  slug: string; // 'ff-restaurent', 'linguflow'
  name: string;
  tagline: string; // one line, used on home and in share cards
  pitch: string; // two lines, home page
  period: string; // 'Mon YYYY - Present', same format as today
  links: { label: string; href: string; primary?: boolean }[];
  health?: string; // server-side health URL for the status lamp
  toy?: 'receipt' | 'flashcards'; // key into a toy registry
  image: string; // fallback when there is no toy
  imageDark?: string;
  story: {
    why: string[]; // paragraphs
    steps: {
      title: string;
      text: string;
      image: string;
      imageDark?: string;
    }[];
    stack: string[];
    changelog: { date: string; text: string }[]; // hand-written, newest first
  };
}
```

Known values:

|              | FF RESTaurent                             | LinguFlow                                |
| ------------ | ----------------------------------------- | ---------------------------------------- |
| Primary link | `https://restaurant.phivo.dev`            | `https://lingu.phivo.dev`                |
| Other link   | `https://app.ff-restaurent.com`           | `https://lingu-flow.vercel.app`          |
| Health URL   | `https://restaurant-api.phivo.dev/health` | `https://lingu-api.phivo.dev/api/health` |

Both health URLs returned 200 publicly on 2026-11-10. Note the different
paths.

The existing descriptions are out of date (FF RESTaurent says Cloud Run and
Cloud SQL, LinguFlow lists Railway). The product entries must describe the
current hosting: one VPS with Docker Compose, frontends on Vercel.

### Home toys (Agreed)

Toys are small stand-alone imitations. They run on sample data in the
browser and make no API calls. Sample data has Vietnamese flavour.

- **Receipt (FF RESTaurent).** A short receipt (for example phở, gỏi cuốn,
  trà đá, prices in đồng) and three or four people. The visitor assigns
  dishes to people, then tears the receipt into one strip per person showing
  each share. A reset puts it back.
- **Flashcards (LinguFlow).** About six cards mixing the exam languages and
  Vietnamese. `Space` flips, arrow keys rate the card (again / good), and the
  stack reorders so "again" cards come back sooner. On touch: tap to flip,
  swipe or buttons to rate.

Rules for every toy:

- Fully usable with keyboard and with touch; every drag has a button or key
  alternative; focus is visible; state changes are announced politely to
  screen readers.
- Loaded lazily when the toy is near the viewport, each in its own chunk.
  Before it loads, a static picture of the object holds the space so nothing
  shifts.
- With reduced motion: no tear or flip animation, the result just appears.
- A product with no `toy` shows its framed screenshot instead.

### Product page (Agreed)

One template renders these blocks in a fixed order, skipping any block whose
data is empty: pitch and links with the status lamp; why I built it; how it
works in three scroll steps with screenshots; the stack; changelog; "try it"
and a link to the next product.

Copy for `why`, `steps` and `changelog` is Phi's to write. The builder drafts
it from the product READMEs and marks it for Phi's review.

### Live status (Agreed)

One Vercel serverless function, `api/status.ts`, calls each product's
`health` URL from Vercel's side with a short timeout and returns
`{ [slug]: 'up' | 'down' }`. Responses are cached for about 60 seconds at the
edge. The browser never calls the product APIs, so CORS is not involved and
nothing changes on the VPS.

- The lamp shows "live" only on `up`. On `down` it shows "having a moment".
- If the function itself fails, times out or is missing (for example in
  `npm run dev`), the lamp is hidden. It never shows a product as down
  because the lamp broke.
- The health URLs live only in the product data read by the function.

## 6. Motion system (Agreed: framer-motion plus CSS only)

No GSAP, Lottie, Rive, canvas or WebGL. Shared primitives in
`src/components/motion/` (my call on location):

| Primitive     | Use                                                 | Reduced motion                 | Keyboard                   |
| ------------- | --------------------------------------------------- | ------------------------------ | -------------------------- |
| `Reveal`      | fade and rise on entering view                      | appears with no movement       | n/a                        |
| `Pickup`      | lift, tilt and drag of desk objects                 | no tilt or drag; static        | focus ring, no drag needed |
| `Tear`        | receipt splitting                                   | strips shown already apart     | button triggers it         |
| `Flip`        | flashcard turn                                      | instant face swap              | `Space` / `Enter`          |
| `Typewriter`  | terminal text, extracted from About                 | full text at once              | n/a                        |
| `ScrollSteps` | pinned panel that changes per step on product pages | steps stacked as normal blocks | normal scrolling           |

All primitives read one `useReducedMotion` source. Sections keep using
`Reveal` in place of ad hoc `whileInView` blocks as they are touched.

Easter eggs (my call, small and optional; drop any that cost too much):
dragging the receipt off the desk prints a new one; typing `help` in the
terminal lists hidden commands; a coffee ring appears under an object that
is picked up.

Performance budget:

- Home page JavaScript at first load: 150 KB gzipped or less.
- Toys and the contact form load on demand in their own chunks.
- Animate only `transform` and `opacity`.
- Lighthouse mobile performance 90 or more on `/`, no layout shift from
  lazy-loaded toys.

## 7. Language (Agreed)

English only. Vietnamese appears as flavour in toy sample data. No i18n
library is added. Copy stays in data files so a later translation is a
contained job.

## 8. Hosting, domain, SEO and analytics

- **Hosting (Agreed).** Stay on the existing Vercel project. Attach
  `phivo.dev` as the primary domain and redirect `www.phivo.dev` to it. The
  current `vercel.app` address keeps working.
- **DNS.** Phi manages Cloudflare. Claude reads the exact records from Vercel
  after the domains are added and gives them to Phi; they are entered as DNS
  only (grey cloud). Claude does not touch DNS. Existing hostnames
  (`restaurant`, `lingu`, their `-staging` and `-api` variants) are not
  changed.
- **Prerendering (my call on method).** `/` and every `/products/:slug` are
  rendered to static HTML at build time so share cards and search engines
  see real content. A new `vercel.json` handles the 404 fallback. The
  builder picks the mechanism (a prerender step on top of React Router, or an
  equivalent) and keeps `npm run build` as the single check.
- **SEO (Agreed).** Per-page title, description and canonical URL on
  `phivo.dev`; `sitemap.xml` and `robots.txt` regenerated from the routes
  (both files exist today in `public/`).
- **Share cards (Agreed).** One 1200 by 630 image for the home page and one
  per product, generated at build time from the product data. My call: if
  build-time generation proves fragile, commit static images under
  `public/og/` instead.
- **Analytics (Agreed).** Vercel Web Analytics: no cookies, no consent
  banner.

## 9. Renaming (Agreed, last step)

After the domain is live and stable, and with Phi's OK at each step:

1. Rename the local remote `orgin` to `origin` (local only).
2. Rename the GitHub repo `Porfolio` to `phivo.dev`.
3. Rename the Vercel project `porfolio` to `phivo-dev`, after checking what
   that does to the old `vercel.app` address.
4. Update the README, `CLAUDE.md` and `AGENTS.md` (which must stay in sync
   with each other) for the new structure and names.

## 10. Constraints

- Follow the repo's `CLAUDE.md` and `AGENTS.md`: tokens in `@theme`, the
  `brand` / `brand-2` accents and their contrast rule, content in data files.
- Work on a branch. Pushing to `main` deploys production, so Phi approves
  every merge or push to `main`.
- Before handing work back: `npm run build`, `npm run lint` and Prettier.
- Small, reversible steps. Ask when something is ambiguous.
- Phi has an uncommitted change in `src/mocks/experiences.ts`; do not commit
  or discard it.

## 11. Suggested order of work

Each step is shippable on its own and leaves the site working:

1. Router, the `products` data file and a plain product page template.
2. Prerendering, `vercel.json`, per-page meta and share cards.
3. Motion primitives; desk tokens; new hero with static object pictures.
4. The receipt toy, then the flashcard toy.
5. Lean desk: merge Skills into the notebook, restyle the remaining stops.
6. Status function and lamp; analytics.
7. Domain: attach `phivo.dev` and `www`, Phi enters DNS, verify.
8. Renames and docs.

## 12. Left to the builder

Component and file names, the exact visual treatment of the desk surface,
breakpoints, the routing and prerender libraries, toy internals and sample
data, and which easter eggs are worth their cost.

## 13. Open items for Phi

- The hero sentence. Working draft: "Phi Vo builds small tools that teams
  use every day."
- Review of the drafted product stories and changelogs before launch.
