import { useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { MotionConfig } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router';
import { Navigation } from './layout/Navigation';
import { Footer } from './layout/Footer';
import { ContactBubble } from './layout/ContactBubble';
import { Desk } from './pages/Desk';
import { NotFound } from './pages/NotFound';
import { ProductPage } from './pages/ProductPage';
import { getMeta } from './seo/meta';

import './App.css';

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
    </MotionConfig>
  );
}

export default App;
