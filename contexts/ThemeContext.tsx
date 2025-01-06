import { createContext, useContext } from 'react';

export interface ThemeContextProps {
  theme: string;
  setTheme: (theme: string) => void;
}

const ThemeContext = createContext<ThemeContextProps>({
  theme: 'default',
  setTheme: () => {},
});

const useThemeContext = () => {
  return useContext(ThemeContext);
};

export { useThemeContext };

export default ThemeContext.Provider;
