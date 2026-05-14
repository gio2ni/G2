'use client';

// ============================================================
// SYSTÈME DE THÈME G2 — Dark / Light mode
//
// Architecture :
//   - ThemeContext + ThemeProvider fournissent theme & toggleTheme
//   - Le thème est appliqué via data-theme="dark|light" sur <html>
//   - CSS variables dans globals.css changent automatiquement
//   - Persisté dans localStorage (clé : 'g2-theme')
//   - Default : dark (correspond à l'identité de la marque)
//
// Usage dans un composant :
//   const { theme, toggleTheme } = useTheme()
// ============================================================

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'sky' | 'dark';

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'sky',
  toggleTheme: () => {},
  isDark: false,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('sky');

  useEffect(() => {
    const saved = localStorage.getItem('g2-theme') as Theme | null;
    const initial = saved === 'dark' ? 'dark' : 'sky';
    setTheme(initial);
    if (initial === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'sky' : 'dark';
    setTheme(next);
    localStorage.setItem('g2-theme', next);
    if (next === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark: theme === 'dark' }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
