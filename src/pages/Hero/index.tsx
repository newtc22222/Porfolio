import { Element } from 'react-scroll';
import { Pickup } from '../../components/motion';
import { HERO_LINE, JOB_TITLE } from '../../constants/self-information';
import { PRODUCTS } from '../../mocks/products';
import { ProductShot } from '../Products/ProductShot';

const COUNT_WORDS = ['No', 'One', 'Two', 'Three', 'Four', 'Five'];
const productCount = COUNT_WORDS[PRODUCTS.length] ?? String(PRODUCTS.length);

const focusRing =
  'focus-visible:outline-brand rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4';

// The top of the desk: one sentence about Phi, and every product within
// reach straight away. Nothing here waits for an entrance animation.
export const Hero = () => (
  <Element name="#home">
    <section id="home" className="desk-surface mt-16 overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 pt-10 pb-20 sm:px-6 sm:pt-20">
        <h1 className="text-primary-light dark:text-primary-dark max-w-4xl text-4xl leading-[1.04] font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
          {HERO_LINE}
        </h1>
        <p className="text-primary-light/80 dark:text-primary-dark/75 mt-5 text-lg sm:text-xl">
          {JOB_TITLE}. {productCount} products live.{' '}
          <span className="text-brand-strong dark:text-brand-2 font-semibold">
            Play with them.
          </span>
        </p>

        <div className="mt-10 grid gap-12 md:grid-cols-2 md:gap-10">
          {PRODUCTS.map((product, index) => {
            const primary = product.links.find((link) => link.primary);
            return (
              <div key={product.slug} data-toy-slot={product.slug}>
                <div className="h-[26rem]">
                  <Pickup
                    rotate={index % 2 === 0 ? -1.5 : 1.5}
                    className="h-full"
                  >
                    <ProductShot product={product} />
                  </Pickup>
                </div>
                <div className="mt-5 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <h2 className="text-primary-light dark:text-primary-dark text-xl font-bold tracking-tight">
                    {product.name}
                  </h2>
                  {primary && (
                    <a
                      href={primary.href}
                      target="_blank"
                      rel="noreferrer"
                      className={`text-brand-strong dark:text-brand-2 font-semibold underline decoration-1 underline-offset-4 hover:decoration-2 ${focusRing}`}
                    >
                      Try the real thing
                      <span className="sr-only">
                        : {product.name} (opens in a new tab)
                      </span>
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  </Element>
);
