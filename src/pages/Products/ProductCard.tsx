import { Link } from 'react-router';
import { StatusLamp } from '../../components/StatusLamp';
import type { Product } from './ProductType';

const focusRing =
  'focus-visible:outline-brand rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4';

export const ProductCard = ({ product }: { product: Product }) => {
  const primary = product.links.find((link) => link.primary);

  return (
    <article className="bg-surface-light dark:bg-surface-dark flex h-full flex-col rounded-lg p-6 shadow-[0_18px_30px_-22px_rgb(0_0_0/0.45)] sm:p-8">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4">
        <h3 className="text-primary-light dark:text-primary-dark text-3xl leading-tight font-bold tracking-tight">
          {product.name}
        </h3>
        <StatusLamp slug={product.slug} />
      </div>
      <p className="text-brand-strong dark:text-brand-2 mt-2 font-semibold">
        {product.tagline}
      </p>
      <p className="text-primary-light/90 dark:text-primary-dark/85 mt-4 leading-relaxed">
        {product.pitch}
      </p>
      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
        {primary && (
          <a
            href={primary.href}
            target="_blank"
            rel="noreferrer"
            className={`bg-brand-strong dark:bg-brand-2 dark:text-background-dark rounded-full rounded-bl-md px-5 py-2 font-semibold text-white ${focusRing}`}
          >
            Try it
            <span className="sr-only">
              : {product.name} (opens in a new tab)
            </span>
          </a>
        )}
        <Link
          to={`/products/${product.slug}`}
          className={`text-brand-strong dark:text-brand-2 font-semibold underline decoration-1 underline-offset-4 hover:decoration-2 ${focusRing}`}
        >
          Read the story
          <span className="sr-only"> of {product.name}</span>
        </Link>
      </div>
    </article>
  );
};
