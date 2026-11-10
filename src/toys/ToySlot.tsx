import {
  Component,
  Suspense,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { Pickup } from '../components/motion';
import type { Product } from '../pages/Products/ProductType';
import { ProductShot } from '../pages/Products/ProductShot';
import { TOYS } from './registry';

// If a toy's chunk fails to load, or the toy throws, show the fallback
// instead of breaking the page.
class ToyBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

// Where a product's toy lives. The parent sets the size, and the slot always
// fills it, so nothing moves when the toy arrives. It shows the product's
// framed screenshot first (that is also what the prerendered HTML holds),
// and swaps in the toy once the slot is within 200px of the viewport.
export const ToySlot = ({
  product,
  rotate = 0,
}: {
  product: Product;
  // Resting angle of the screenshot, in degrees.
  rotate?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  const Toy = product.toy ? TOYS[product.toy] : undefined;

  useEffect(() => {
    const node = ref.current;
    if (!node || !Toy) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [Toy]);

  const shot = (
    <Pickup rotate={rotate} className="h-full">
      <ProductShot product={product} />
    </Pickup>
  );

  return (
    <div ref={ref} className="h-full">
      {Toy && near ? (
        <ToyBoundary fallback={shot}>
          <Suspense fallback={shot}>
            <Toy />
          </Suspense>
        </ToyBoundary>
      ) : (
        shot
      )}
    </div>
  );
};
