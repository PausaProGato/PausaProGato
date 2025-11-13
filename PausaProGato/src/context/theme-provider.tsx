// context/theme-provider.tsx - VERSÃO SIMPLIFICADA
import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light' | 'system';

type ThemeProviderState = {
  theme: Theme;
  toggleTheme: (theme: Theme) => void;
  isDark: boolean;
};

const ThemeContext = createContext<ThemeProviderState | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('system');
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('ui-theme') as Theme;
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    
    const initialTheme = savedTheme || 'system';
    setTheme(initialTheme);
    
    if (initialTheme === 'system') {
      setIsDark(systemTheme === 'dark');
    } else {
      setIsDark(initialTheme === 'dark');
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    
    root.classList.remove('light', 'dark');
    
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
      setIsDark(systemTheme === 'dark');
    } else {
      root.classList.add(theme);
      setIsDark(theme === 'dark');
    }
    
    localStorage.setItem('ui-theme', theme);
  }, [theme]);

  const toggleTheme = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  const value = {
    theme,
    toggleTheme,
    isDark
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};