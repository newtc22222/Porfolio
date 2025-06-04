import { useEffect, useState } from 'react';

export const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(() => {
    // Check system preference
    if (typeof window !== 'undefined') {
      const systemPreference = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      const savedPreference = localStorage.getItem('darkMode');

      // Return saved preference if it exists, otherwise use system preference
      return savedPreference ? JSON.parse(savedPreference) : systemPreference;
    }
    return false;
  });

  const title = darkMode ? 'Switch to light mode' : 'Switch to dark mode';

  useEffect(() => {
    // Update theme attribute
    document.documentElement.setAttribute(
      'data-theme',
      darkMode ? 'dark' : 'light'
    );
    // Save preference
    localStorage.setItem('darkMode', JSON.stringify(darkMode));

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setDarkMode(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode((prev: boolean) => !prev);
  };

  return (
    <button
      className="dark:bg-background-dark rounded-lg border p-2 transition-colors duration-200 hover:cursor-pointer dark:border-white"
      onClick={toggleTheme}
      aria-label={title}
      title={title}
    >
      {darkMode ? '😎' : '🌚'}
    </button>
  );
};
