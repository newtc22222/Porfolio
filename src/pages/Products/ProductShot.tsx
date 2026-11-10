import type { Product } from './ProductType';

// A product's framed screenshot, filling its container. It stands in for a
// toy: while the toy loads, if it fails, and for products without one.
export const ProductShot = ({ product }: { product: Product }) => (
  <div className="border-frame-light dark:border-frame-dark bg-mat-light dark:bg-mat-dark h-full w-full border-[6px] p-3 shadow-[0_18px_30px_-18px_rgb(0_0_0/0.45)] sm:p-4">
    <img
      src={product.image}
      alt={`Screenshot of ${product.name}`}
      className={`h-full w-full object-cover object-top ${product.imageDark ? 'dark:hidden' : ''}`}
    />
    {product.imageDark && (
      <img
        src={product.imageDark}
        alt={`Screenshot of ${product.name}`}
        className="hidden h-full w-full object-cover object-top dark:block"
      />
    )}
  </div>
);
