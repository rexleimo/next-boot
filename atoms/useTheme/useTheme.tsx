'use client';
import { useAtom } from 'jotai';
import { theme } from './atoms';
import { useEffect } from 'react';

function useTheme() {
  const [themeAtom, setTheme] = useAtom(theme);
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', themeAtom);
  }, [themeAtom]);

  return {
    theme: themeAtom,
    setTheme,
  };
}

export default useTheme;
