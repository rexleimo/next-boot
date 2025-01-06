'use client';

import { ReactNode, useMemo, useState } from 'react';
import ThemeContext from '@/contexts/ThemeContext';

function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState('default');
  const value = useMemo(() => {
    return { theme, setTheme };
  }, [theme, setTheme]);

  return <ThemeContext value={value}>{children}</ThemeContext>;
}

export default ThemeProvider;
