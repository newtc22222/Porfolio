// Writes one static HTML file per route into dist/, plus 404.html,
// sitemap.xml and robots.txt. Runs after `vite build` and
// `vite build --ssr src/entry-server.tsx --outDir dist-ssr`.
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');

const { render, staticPaths, getMeta, SITE_URL, PRODUCTS } = await import(
  pathToFileURL(join(root, 'dist-ssr', 'entry-server.js')).href
);

const escapeHtml = (text) =>
  text
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

const head = (meta) => {
  const title = escapeHtml(meta.title);
  const description = escapeHtml(meta.description);
  return [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    `<link rel="canonical" href="${meta.canonical}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="Phi Vo" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:url" content="${meta.canonical}" />`,
    `<meta property="og:image" content="${meta.image}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${title}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    `<meta name="twitter:image" content="${meta.image}" />`,
  ].join('\n    ');
};

const template = await readFile(join(dist, 'index.html'), 'utf8');
for (const marker of ['<!--app-head-->', '<!--app-html-->']) {
  if (!template.includes(marker)) {
    throw new Error(`index.html is missing the ${marker} placeholder`);
  }
}

const page = (path) =>
  template
    .replace('<!--app-head-->', head(getMeta(path)))
    .replace('<!--app-html-->', render(path));

// Route -> file inside dist/. A route /a/b becomes a/b.html, which Vercel
// (cleanUrls) and `vite preview` both serve at /a/b.
const outputs = new Map(
  staticPaths().map((path) => [
    path,
    path === '/' ? 'index.html' : `${path.slice(1)}.html`,
  ])
);
outputs.set('/404', '404.html');

const written = new Map();
for (const [path, file] of outputs) {
  const html = page(path);
  await mkdir(dirname(join(dist, file)), { recursive: true });
  await writeFile(join(dist, file), html);
  written.set(file, html);
  console.log(`prerendered ${path} -> dist/${file.replace(/\\/g, '/')}`);
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPaths()
  .map((path) => `  <url><loc>${getMeta(path).canonical}</loc></url>`)
  .join('\n')}
</urlset>
`;
await writeFile(join(dist, 'sitemap.xml'), sitemap);
await writeFile(
  join(dist, 'robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`
);

// Checks. A visitor without JavaScript, and a search engine, must still get
// the products and a real 404 page.
const failures = [];
const expect = (file, text, what) => {
  // React escapes text, so compare against the escaped form.
  if (!written.get(file)?.includes(escapeHtml(text).replace(/&quot;/g, '"'))) {
    failures.push(`dist/${file} is missing ${what}: ${text}`);
  }
};

for (const product of PRODUCTS) {
  const primary = product.links.find((link) => link.primary);
  expect('index.html', product.name, 'a product name');
  if (primary) expect('index.html', primary.href, 'a "try it" link');
  const file = `products/${product.slug}.html`;
  expect(file, product.name, 'the product name');
  expect(file, product.tagline, 'the product tagline');
}
expect('404.html', 'Nothing on the desk here', 'the 404 heading');
for (const [file, html] of written) {
  if (html.includes('<!--app-')) {
    failures.push(`dist/${file} still contains a placeholder`);
  }
}

if (failures.length > 0) {
  console.error(failures.join('\n'));
  process.exit(1);
}
console.log(`prerender checks passed for ${written.size} pages`);
