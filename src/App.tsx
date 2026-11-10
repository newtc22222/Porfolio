import { useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { LazyMotion, MotionConfig } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router';
import { Navigation } from './layout/Navigation';
import { Footer } from './layout/Footer';
import { ContactBubble } from './layout/ContactBubble';
import { Desk } from './pages/Desk';
import { NotFound } from './pages/NotFound';
import { ProductPage } from './pages/ProductPage';
import { getMeta } from './seo/meta';

import './App.css';

const loadMotionFeatures = () =>
  import('./components/motion/features').then((module) => module.default);

// A new page starts at the top, unless the address carries a section hash
// (the Desk scrolls to that itself).
const usePageChange = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname, hash]);
  // Each prerendered page ships its own <title>; keep it right after
  // client-side navigation too.
  useEffect(() => {
    document.title = getMeta(pathname).title;
  }, [pathname]);
};

function App() {
  usePageChange();

  return (
    <MotionConfig reducedMotion="user">
      {/* Components use the light `m` elements; the animation features are
          loaded once, here, after the first render. `strict` fails the build of any stray `motion.*`. */}
      <LazyMotion features={loadMotionFeatures} strict>
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<Desk />} />
            <Route path="/products/:slug" element={<ProductPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <ContactBubble />
        <Analytics />
      </LazyMotion>
    </MotionConfig>
  );
}

export default App;
