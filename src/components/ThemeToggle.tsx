import { useEffect, useState } from "react";

export const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(() => {
    // Check system preference
    if (typeof window !== "undefined") {
      const systemPreference = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      const savedPreference = localStorage.getItem("darkMode");

      // Return saved preference if it exists, otherwise use system preference
      return savedPreference ? JSON.parse(savedPreference) : systemPreference;
    }
    return false;
  });

  useEffect(() => {
    // Update theme attribute
    document.documentElement.setAttribute(
      "data-theme",
      darkMode ? "dark" : "light"
    );
    // Save preference
    localStorage.setItem("darkMode", JSON.stringify(darkMode));

    // Listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      setDarkMode(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="p-2 rounded-lg border dark:border-white dark:bg-background-dark 
                hover:cursor-pointer transition-colors duration-200"
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {darkMode ? "😎" : "🌚"}
    </button>
  );
};
