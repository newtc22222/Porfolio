import { useEffect, useSyncExternalStore } from 'react';

// Keep in sync with the inline pre-paint script in index.html.
const STORAGE_KEY = 'darkMode';
const DARK_QUERY = '(prefers-color-scheme: dark)';

const readSavedPreference = (): boolean | null => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === null ? null : saved === 'true';
  } catch {
    return null;
  }
};

const savePreference = (dark: boolean) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dark));
  } catch {
    // Storage unavailable (private mode, blocked site data): theme still applies for this page view.
  }
};

const systemPrefersDark = () => window.matchMedia(DARK_QUERY).matches;

const applyTheme = (dark: boolean) => {
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
};

// The data-theme attribute on <html> is the single source of truth, so every
// ThemeToggle instance (desktop and mobile menu) stays in sync.
const subscribe = (onChange: () => void) => {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  });
  return () => observer.disconnect();
};

const getSnapshot = () => {
  const attr = document.documentElement.getAttribute('data-theme');
  if (attr === 'dark') return true;
  if (attr === 'light') return false;
  return readSavedPreference() ?? systemPrefersDark();
};

const getServerSnapshot = () => false;

export const ThemeToggle = () => {
  const darkMode = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  useEffect(() => {
    // Make sure the attribute is set even if the inline script did not run.
    if (!document.documentElement.hasAttribute('data-theme')) {
      applyTheme(getSnapshot());
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
      className="dark:bg-background-dark rounded-lg border p-2 transition-colors duration-200 hover:cursor-pointer dark:border-white"
      onClick={toggleTheme}
      aria-label={title}
      title={title}
    >
      {darkMode ? '😎' : '🌚'}
    </button>
  );
};
