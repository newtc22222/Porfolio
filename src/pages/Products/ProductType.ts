// Key into the toy registry (src/toys/registry.ts).
export type ToyKey = 'receipt' | 'flashcards';

export interface ProductLink {
  label: string;
  href: string;
  primary?: boolean;
}

export interface ProductStep {
  title: string;
  text: string;
  image: string;
  // Shown instead of `image` in dark mode.
  imageDark?: string;
}

export interface Product {
  slug: string;
  name: string;
  // One line, used on the home page and in share cards.
  tagline: string;
  // Two lines, home page.
  pitch: string;
  // 'Mon YYYY - Present', the format the Experience chart parses.
  period: string;
  links: ProductLink[];
  // Server-side health URL, read only by api/status.ts.
  health?: string;
  toy?: ToyKey;
  // Shown when there is no toy, and while a toy loads.
  image: string;
  imageDark?: string;
  story: {
    why: string[];
    steps: ProductStep[];
    stack: string[];
    // Hand-written, newest first.
    changelog: { date: string; text: string }[];
  };
}
