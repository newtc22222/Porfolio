import { Link, useParams } from 'react-router';
import { PRODUCTS, findProduct } from '../../mocks/products';
import { NotFound } from '../NotFound';

const focusRing =
  'focus-visible:outline-brand rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4';

const heading =
  'text-primary-light dark:text-primary-dark text-3xl font-bold tracking-tight';

export const ProductPage = () => {
  const { slug = '' } = useParams();
  const product = findProduct(slug);
  if (!product) return <NotFound />;

  const { story } = product;
  const primary = product.links.find((link) => link.primary);
  const index = PRODUCTS.indexOf(product);
  const next = PRODUCTS[(index + 1) % PRODUCTS.length];

  return (
    <article className="bg-background-light dark:bg-background-dark mt-16 pb-24">
      <header className="mx-auto max-w-4xl px-4 pt-20 sm:px-6">
        <p className="text-secondary-light dark:text-secondary-dark text-sm">
          {product.period}
        </p>
        <h1 className="text-primary-light dark:text-primary-dark mt-2 text-5xl leading-none font-bold tracking-tight sm:text-6xl">
          {product.name}
        </h1>
        <p className="text-brand-strong dark:text-brand-2 mt-4 text-xl font-semibold">
          {product.tagline}
        </p>
        <p className="text-primary-light/90 dark:text-primary-dark/85 mt-4 max-w-2xl text-lg leading-relaxed">
          {product.pitch}
        </p>
        <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          {product.links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className={
                  link.primary
                    ? `bg-brand-strong dark:bg-brand-2 dark:text-background-dark inline-block rounded-full rounded-bl-md px-5 py-2 font-semibold text-white ${focusRing}`
                    : `text-brand-strong dark:text-brand-2 font-semibold underline decoration-1 underline-offset-4 hover:decoration-2 ${focusRing}`
                }
              >
                {link.label}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </header>

      {story.why.length > 0 && (
        <section className="mx-auto mt-20 max-w-4xl px-4 sm:px-6">
          <h2 className={heading}>Why I built it</h2>
          <div className="text-primary-light/90 dark:text-primary-dark/85 mt-6 max-w-2xl space-y-4 text-lg leading-relaxed">
            {story.why.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>
      )}

      {story.steps.length > 0 && (
        <section className="mx-auto mt-20 max-w-6xl px-4 sm:px-6">
          <h2 className={`${heading} mx-auto max-w-4xl`}>How it works</h2>
          <ol className="mt-8 space-y-12">
            {story.steps.map((step, stepIndex) => (
              <li
                key={step.title}
                className="grid items-center gap-6 md:grid-cols-2 md:gap-12"
              >
                <div>
                  <p className="text-secondary-light dark:text-secondary-dark font-mono text-sm">
                    Step {stepIndex + 1}
                  </p>
                  <h3 className="text-primary-light dark:text-primary-dark mt-1 text-2xl font-bold tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-primary-light/90 dark:text-primary-dark/85 mt-3 leading-relaxed">
                    {step.text}
                  </p>
                </div>
                <div className="border-frame-light dark:border-frame-dark aspect-video overflow-hidden border-[6px]">
                  <img
                    src={step.image}
                    alt=""
                    loading="lazy"
                    className={`h-full w-full object-cover object-top ${step.imageDark ? 'dark:hidden' : ''}`}
                  />
                  {step.imageDark && (
                    <img
                      src={step.imageDark}
                      alt=""
                      loading="lazy"
                      className="hidden h-full w-full object-cover object-top dark:block"
                    />
                  )}
                </div>
              </li>
            ))}
          </ol>
        </section>
      )}

      {story.stack.length > 0 && (
        <section className="mx-auto mt-20 max-w-4xl px-4 sm:px-6">
          <h2 className={heading}>Built with</h2>
          <ul className="mt-6 flex flex-wrap gap-2">
            {story.stack.map((tech) => (
              <li
                key={tech}
                className="bg-surface-light dark:bg-surface-dark text-primary-light dark:text-primary-dark rounded-full px-3 py-1 text-sm"
              >
                {tech}
              </li>
            ))}
          </ul>
        </section>
      )}

      {story.changelog.length > 0 && (
        <section className="mx-auto mt-20 max-w-4xl px-4 sm:px-6">
          <h2 className={heading}>Changelog</h2>
          <ol className="mt-6 space-y-3">
            {story.changelog.map((entry) => (
              <li key={entry.date + entry.text} className="flex gap-4">
                <span className="text-secondary-light dark:text-secondary-dark w-24 shrink-0 font-mono text-sm leading-7">
                  {entry.date}
                </span>
                <span className="text-primary-light/90 dark:text-primary-dark/85 leading-7">
                  {entry.text}
                </span>
              </li>
            ))}
          </ol>
        </section>
      )}

      <footer className="mx-auto mt-20 flex max-w-4xl flex-wrap items-center justify-between gap-6 px-4 sm:px-6">
        {primary && (
          <a
            href={primary.href}
            target="_blank"
            rel="noreferrer"
            className={`bg-brand-strong dark:bg-brand-2 dark:text-background-dark rounded-full rounded-bl-md px-6 py-3 text-lg font-semibold text-white ${focusRing}`}
          >
            Try {product.name}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        )}
        {next !== product && (
          <Link
            to={`/products/${next.slug}`}
            className={`text-brand-strong dark:text-brand-2 font-semibold underline decoration-1 underline-offset-4 hover:decoration-2 ${focusRing}`}
          >
            Next: {next.name}
          </Link>
        )}
      </footer>
    </article>
  );
};
