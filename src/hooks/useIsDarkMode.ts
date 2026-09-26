import { useSyncExternalStore } from 'react';

// Keep in sync with the inline pre-paint script in index.html.
export const THEME_STORAGE_KEY = 'darkMode';
export const DARK_QUERY = '(prefers-color-scheme: dark)';

export const readSavedPreference = (): boolean | null => {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    return saved === null ? null : saved === 'true';
  } catch {
    return null;
  }
};

export const systemPrefersDark = () => window.matchMedia(DARK_QUERY).matches;

// The data-theme attribute on <html> is the single source of truth, so every
// subscriber (theme toggles, particle colours) stays in sync.
const subscribe = (onChange: () => void) => {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  });
  return () => observer.disconnect();
};

export const getIsDarkMode = () => {
  const attr = document.documentElement.getAttribute('data-theme');
  if (attr === 'dark') return true;
  if (attr === 'light') return false;
  return readSavedPreference() ?? systemPrefersDark();
};

const getServerSnapshot = () => false;

export const useIsDarkMode = () =>
  useSyncExternalStore(subscribe, getIsDarkMode, getServerSnapshot);
