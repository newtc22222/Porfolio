import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-scroll';
import { AnimatePresence, motion } from 'framer-motion';
import { NavItem } from './NavItem';

import { NAV_PAGES } from '../../mocks/pages';
import { ThemeToggle } from '../../components/ThemeToggle';

const MOBILE_MENU_ID = 'mobile-nav-menu';

export const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

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
    <nav
      aria-label="Main"
      className="bg-background-light/80 dark:bg-background-dark/80 border-primary-light/20 dark:border-primary-dark/20 fixed top-0 right-0 left-0 z-50 border-b backdrop-blur-sm"
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link
            spy
            to="#home"
            href="#home"
            smooth
            duration={500}
            onClick={closeMenu}
            className="nav-item text-xl font-bold transition-all"
          >
            Portfolio
          </Link>
          <div className="hidden items-center space-x-6 lg:flex">
            {NAV_PAGES.map((page) => (
              <NavItem key={page.href} href={page.href} label={page.label} />
            ))}
            <ThemeToggle />
          </div>
          <button
            ref={menuButtonRef}
            type="button"
            className="text-primary-light dark:text-primary-dark hover:text-brand-strong dark:hover:text-brand-2 focus-visible:ring-brand rounded-lg p-2 transition-colors hover:cursor-pointer focus-visible:ring-2 focus-visible:outline-none lg:hidden"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls={MOBILE_MENU_ID}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <svg
              aria-hidden="true"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
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
            className="bg-background-light dark:bg-background-dark border-primary-light/20 dark:border-primary-dark/20 overflow-hidden border-t lg:hidden"
          >
            <ul className="container mx-auto flex flex-col px-4 py-2">
              {NAV_PAGES.map((page) => (
                <li key={page.href}>
                  <NavItem
                    href={page.href}
                    label={page.label}
                    onClick={closeMenu}
                    className="block py-3"
                  />
                </li>
              ))}
              <li className="py-3">
                <ThemeToggle />
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
