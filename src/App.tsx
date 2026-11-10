import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router';
import { Navigation } from './layout/Navigation';
import { Footer } from './layout/Footer';
import { ContactBubble } from './layout/ContactBubble';
import { Desk } from './pages/Desk';
import { NotFound } from './pages/NotFound';
import { ProductPage } from './pages/ProductPage';

import './App.css';

// A new page starts at the top, unless the address carries a section hash
// (the Desk scrolls to that itself).
const useScrollToTopOnNavigate = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname, hash]);
};

function App() {
  useScrollToTopOnNavigate();

  return (
    <>
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
    </>
  );
}

export default App;
