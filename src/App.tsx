import { Navigation } from './layout/Navigation';
import { Footer } from './layout/Footer';
import { ContactBubble } from './layout/ContactBubble';
import { Home, Projects, Blog, About, Experiences, Education } from './pages';
import { lazy, Suspense } from 'react';
import { Element } from 'react-scroll';
import { BADGES } from './mocks/badges';

import './App.css';

// Use dynamic imports for heavy components
const Skills = lazy(() =>
  import('./pages/Skills').then((m) => ({ default: m.Skills }))
);
const Badges = lazy(() =>
  import('./pages/Badges').then((m) => ({ default: m.Badges }))
);

// Keeps the react-scroll anchor (and the section id) in the DOM while a lazy
// section's chunk is loading, so nav links and scroll spy still work.
const SectionPlaceholder = ({ id }: { id: string }) => (
  <Element name={`#${id}`}>
    <section id={id} aria-busy="true" className="min-h-screen" />
  </Element>
);

function App() {
  return (
    <>
      <Navigation />
      <Home />
      <Projects />
      <Suspense fallback={<SectionPlaceholder id="skills" />}>
        <Skills />
      </Suspense>
      <Blog />
      <Experiences />
      <Education />
      <About />
      {BADGES.length > 0 && (
        <Suspense fallback={<SectionPlaceholder id="badges" />}>
          <Badges />
        </Suspense>
      )}
      <Footer />
      <ContactBubble />
    </>
  );
}

export default App;
