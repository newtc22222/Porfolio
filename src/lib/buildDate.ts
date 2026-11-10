// The day the site was built, injected by Vite (see vite.config.ts). Anything
// that renders "now" uses this instead of `new Date()`, so the prerendered
// HTML and the browser's first render agree.
export const BUILD_DATE = new Date(__BUILD_DATE__);
