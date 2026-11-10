import { lazy, Suspense, useEffect } from 'react';
import { useLocation } from 'react-router';
import { Element } from 'react-scroll';
import { useIsClient } from '../hooks/useIsClient';
import { BADGES } from '../mocks/badges';
import { About } from './About';
import { Blog } from './Blogs';
import { Education } from './Education';
import { Experiences } from './Experiences';
import { Hero } from './Hero';
import { Products } from './Products';
import { Projects } from './Projects';

// Use dynamic imports for heavy components
const Skills = lazy(() =>
  import('./Skills').then((m) => ({ default: m.Skills }))
);
const Badges = lazy(() =>
  import('./Badges').then((m) => ({ default: m.Badges }))
);

// Keeps the react-scroll anchor (and the section id) in the DOM while a lazy
// section's chunk is loading, so nav links and scroll spy still work.
const SectionPlaceholder = ({ id }: { id: string }) => (
  <Element name={`#${id}`}>
    <section id={id} aria-busy="true" className="min-h-screen" />
  </Element>
);

// Arriving from another page with a hash (for example /#blog) lands on that
// section. The fixed navbar is 64px tall.
const useScrollToHash = () => {
  const { hash } = useLocation();
  useEffect(() => {
    if (!hash) return;
    const target = document.getElementById(hash.slice(1));
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.scrollY - 64;
    window.scrollTo({ top, behavior: 'auto' });
  }, [hash]);
};

export const Desk = () => {
  useScrollToHash();
  // Lazy sections are left out of the prerendered HTML (a placeholder holds
  // their anchor) and load in the browser.
  const isClient = useIsClient();

  return (
    <>
      <Hero />
      <Products />
      <Projects />
      <Experiences />
      <Suspense fallback={<SectionPlaceholder id="skills" />}>
        {isClient ? <Skills /> : <SectionPlaceholder id="skills" />}
      </Suspense>
      <Education />
      {BADGES.length > 0 && (
        <Suspense fallback={<SectionPlaceholder id="badges" />}>
          {isClient ? <Badges /> : <SectionPlaceholder id="badges" />}
        </Suspense>
      )}
      <Blog />
      <About />
    </>
  );
};
