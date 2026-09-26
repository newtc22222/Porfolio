import { useEffect } from 'react';
import {
  DARK_QUERY,
  THEME_STORAGE_KEY,
  getIsDarkMode,
  readSavedPreference,
  useIsDarkMode,
} from '../hooks/useIsDarkMode';

const savePreference = (dark: boolean) => {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(dark));
  } catch {
    // Storage unavailable (private mode, blocked site data): theme still applies for this page view.
  }
};

const applyTheme = (dark: boolean) => {
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
};

export const ThemeToggle = () => {
  const darkMode = useIsDarkMode();

  useEffect(() => {
    // Make sure the attribute is set even if the inline script did not run.
    if (!document.documentElement.hasAttribute('data-theme')) {
      applyTheme(getIsDarkMode());
    }

    // Follow OS changes only while the user has not picked a theme explicitly.
    const mediaQuery = window.matchMedia(DARK_QUERY);
    const handleChange = (e: MediaQueryListEvent) => {
      if (readSavedPreference() === null) applyTheme(e.matches);
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const title = darkMode ? 'Switch to light mode' : 'Switch to dark mode';

  const toggleTheme = () => {
    const next = !darkMode;
    applyTheme(next);
    savePreference(next);
  };

  return (
    <button
      type="button"
      className="text-primary-light dark:text-primary-dark hover:bg-primary-light/10 dark:hover:bg-primary-dark/10 focus-visible:ring-brand/50 dark:focus-visible:ring-brand-2/50 flex h-9 w-9 items-center justify-center rounded-full transition-colors duration-200 hover:cursor-pointer focus-visible:ring-2 focus-visible:outline-none"
      onClick={toggleTheme}
      aria-label={title}
      title={title}
    >
      {/* Shows the theme you will switch to. */}
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        {darkMode ? (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
          </>
        ) : (
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        )}
      </svg>
    </button>
  );
};
