/* eslint-disable react-refresh/only-export-components -- not a component module; it is the server entry. */
// Server entry, built with `vite build --ssr`. scripts/prerender.mjs uses it
// to write one static HTML file per route.
import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import App from './App';
import { PRODUCTS } from './mocks/products';

export { getMeta, SITE_URL } from './seo/meta';
export { PRODUCTS };

export const render = (url: string): string =>
  renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>
  );

export const staticPaths = (): string[] => [
  '/',
  ...PRODUCTS.map((product) => `/products/${product.slug}`),
];
