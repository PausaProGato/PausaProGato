import React from 'react';
import { ThemeProvider } from './theme-provider';

interface AppContextProps {
  children: React.ReactNode;
}

export function AppContext({ children }: AppContextProps) {
  return <ThemeProvider>{children}</ThemeProvider>;
}