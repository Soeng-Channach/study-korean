import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { STORAGE_KEYS } from '../lib/constants';

const ThemeContext = createContext(null);

const THEME_COLORS = { light: '#f8fafc', dark: '#0f172a' };

// Saved choice first, then the OS preference. Only an explicit toggle is
// persisted, so a user who never touched the switch keeps following the OS.
function readInitialTheme() {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.theme);
    if (stored === 'dark' || stored === 'light') return stored;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  } catch {
    return 'light';
  }
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(readInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    // Keep the browser chrome (mobile status bar, PWA title bar) in step.
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', THEME_COLORS[theme]);
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      isDark: theme === 'dark',
      toggleTheme: () =>
        setTheme((current) => {
          const next = current === 'dark' ? 'light' : 'dark';
          try {
            localStorage.setItem(STORAGE_KEYS.theme, next);
          } catch {
            // Storage unavailable; the theme still applies for this session.
          }
          return next;
        })
    }),
    [theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used inside ThemeProvider');
  }
  return context;
}
