'use client';

import { ReactNode, useEffect, useMemo, useState } from 'react';
import ThemeContext from '@/contexts/ThemeContext';

function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState('dark');
  const value = useMemo(() => {
    return { theme, setTheme };
  }, [theme, setTheme]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return <ThemeContext value={value}>{children}</ThemeContext>;
}

export default ThemeProvider;
