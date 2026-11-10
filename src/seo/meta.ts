import { findProduct } from '../mocks/products';

export const SITE_URL = 'https://phivo.dev';

export interface PageMeta {
  title: string;
  description: string;
  canonical: string;
  // Absolute address of the 1200x630 share card.
  image: string;
}

const HOME: PageMeta = {
  title: 'Phi Vo: maker of FF RESTaurent and LinguFlow',
  description:
    'Phi Vo is a software engineer who builds and runs FF RESTaurent, a group bill splitter, and LinguFlow, keyboard-driven flashcards. Try both.',
  canonical: `${SITE_URL}/`,
  image: `${SITE_URL}/og/home.png`,
};

const PRODUCT_PATH = /^\/products\/([^/]+)\/?$/;

export const getMeta = (pathname: string): PageMeta => {
  if (pathname === '/' || pathname === '') return HOME;

  const slug = PRODUCT_PATH.exec(pathname)?.[1];
  const product = slug ? findProduct(slug) : undefined;
  if (product) {
    return {
      title: `${product.name}: ${product.tagline} | Phi Vo`,
      description: product.pitch,
      canonical: `${SITE_URL}/products/${product.slug}`,
      image: `${SITE_URL}/og/${product.slug}.png`,
    };
  }

  return {
    title: 'Not found | Phi Vo',
    description: 'There is nothing on the desk at this address.',
    canonical: `${SITE_URL}/`,
    image: HOME.image,
  };
};
