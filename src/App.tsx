import { Navigation } from './layout/Navigation';
import { Footer } from './layout/Footer';
import {
  Home,
  Projects,
  Skills,
  Blog,
  About,
  Achievements,
  Experiences,
} from './pages';
import { lazy, Suspense } from 'react';

import './App.css';

// Use dynamic imports for heavy components
const Contact = lazy(() => import('./pages/Contact'));

function App() {
  return (
    <>
      <Navigation />
      <Home />
      <Projects />
      <Skills />
      <Blog />
      <Experiences />
      <About />
      <Achievements />
      <Suspense fallback={<div>Loading...</div>}>
        <Contact />
      </Suspense>
      <Footer />
    </>
  );
}

export default App;
