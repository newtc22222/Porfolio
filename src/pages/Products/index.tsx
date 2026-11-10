import { Element } from 'react-scroll';
import { Pickup, Reveal } from '../../components/motion';
import { PRODUCTS } from '../../mocks/products';
import { ProductCard } from './ProductCard';

export const Products = () => (
  <Element name="#products">
    <section id="products" className="desk-surface py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <header className="mb-12 max-w-2xl">
          <h2 className="text-primary-light dark:text-primary-dark text-5xl leading-none font-bold tracking-tight">
            Products
          </h2>
          <p className="text-secondary-light dark:text-secondary-dark mt-4 text-lg">
            Two things I built, run and use. Both are live.
          </p>
        </header>
        <div className="grid gap-8 md:grid-cols-2">
          {PRODUCTS.map((product, index) => (
            <Reveal key={product.slug} delay={index * 0.1}>
              <Pickup rotate={index % 2 === 0 ? -0.6 : 0.6} className="h-full">
                <ProductCard product={product} />
              </Pickup>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  </Element>
);
