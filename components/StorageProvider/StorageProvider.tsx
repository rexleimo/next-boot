"use client";
import { ReactNode } from 'react';
import { Provider } from 'jotai';
import { useTheme } from '@/atoms';

function StorageProvider({ children }: { children: ReactNode }) {
  useTheme();
  return <Provider>{children}</Provider>;
}

export default StorageProvider;
