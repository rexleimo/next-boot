import { atom } from 'jotai';

type Theme = 'light' | 'dark';
const theme = atom<Theme>('dark');

export { theme };


