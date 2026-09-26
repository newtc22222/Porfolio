import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-scroll';
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useScroll,
  useSpring,
} from 'framer-motion';
import { NavItem } from './NavItem';

import { NAV_PAGES } from '../../mocks/pages';
import { FULLNAME, INITIALS } from '../../constants/self-information';
import { ThemeToggle } from '../../components/ThemeToggle';

const MOBILE_MENU_ID = 'mobile-nav-menu';

export const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState(NAV_PAGES[0].href);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Hairline along the bottom edge that fills as the page is read.
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 40,
    restDelta: 0.001,
  });

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    // Close the panel if the viewport grows past the lg breakpoint.
    const desktopQuery = window.matchMedia('(min-width: 1024px)');
    const handleResize = (e: MediaQueryListEvent) => {
      if (e.matches) setMenuOpen(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    desktopQuery.addEventListener('change', handleResize);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      desktopQuery.removeEventListener('change', handleResize);
    };
  }, [menuOpen]);

  return (
    <MotionConfig reducedMotion="user">
      <nav
        aria-label="Main"
        className="bg-background-light/85 dark:bg-background-dark/85 fixed top-0 right-0 left-0 z-50 backdrop-blur-md"
      >
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between gap-4">
            <Link
              to="#home"
              href="#home"
              smooth
              duration={500}
              onClick={closeMenu}
              aria-label={`${FULLNAME}, back to top`}
              className="group focus-visible:ring-brand/50 dark:focus-visible:ring-brand-2/50 flex shrink-0 cursor-pointer items-center gap-2.5 rounded-lg focus-visible:ring-2 focus-visible:outline-none"
            >
              <span
                aria-hidden="true"
                className="bg-brand-strong dark:bg-brand-2 dark:text-background-dark flex h-9 w-9 items-center justify-center rounded-full rounded-bl-md text-sm font-extrabold tracking-tight text-white transition-transform duration-200 group-hover:-rotate-6 motion-reduce:transition-none motion-reduce:group-hover:rotate-0"
              >
                {INITIALS}
              </span>
              <span className="text-primary-light dark:text-primary-dark text-lg font-bold tracking-tight lg:hidden xl:inline">
                {FULLNAME}
              </span>
            </Link>

            <ul className="hidden items-center gap-0.5 lg:flex">
              {NAV_PAGES.map((page) => (
                <li key={page.href}>
                  <NavItem
                    href={page.href}
                    label={page.label}
                    isActive={activeHref === page.href}
                    onActive={setActiveHref}
                  />
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-1">
              <ThemeToggle />
              <button
                ref={menuButtonRef}
                type="button"
                className="text-primary-light dark:text-primary-dark hover:bg-primary-light/10 dark:hover:bg-primary-dark/10 focus-visible:ring-brand/50 dark:focus-visible:ring-brand-2/50 flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:cursor-pointer focus-visible:ring-2 focus-visible:outline-none lg:hidden"
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
                aria-controls={MOBILE_MENU_ID}
                onClick={() => setMenuOpen((open) => !open)}
              >
                <svg
                  aria-hidden="true"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  viewBox="0 0 24 24"
                >
                  {menuOpen ? (
                    <path d="M6 6l12 12M18 6L6 18" />
                  ) : (
                    <path d="M4 8h16M4 16h10" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {menuOpen && (
            <motion.div
              id={MOBILE_MENU_ID}
              key="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden lg:hidden"
            >
              <ul className="container mx-auto grid grid-cols-2 gap-x-4 px-4 pt-1 pb-4">
                {NAV_PAGES.map((page) => (
                  <li key={page.href}>
                    <NavItem
                      href={page.href}
                      label={page.label}
                      isActive={activeHref === page.href}
                      onActive={setActiveHref}
                      onClick={closeMenu}
                      variant="menu"
                    />
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Track and fill for the reading-progress hairline. */}
        <div className="bg-primary-light/10 dark:bg-primary-dark/10 absolute inset-x-0 bottom-0 h-px" />
        <motion.div
          aria-hidden="true"
          style={{ scaleX: progress }}
          className="bg-brand-strong dark:bg-brand-2 absolute inset-x-0 bottom-0 h-0.5 origin-left"
        />
      </nav>
    </MotionConfig>
  );
};
