import { createContext } from 'react';

interface MenuContextType {
  open?: boolean;
  setOpen?: (open: boolean) => void;
}

export const MenuContext = createContext<MenuContextType>({});

export const MenuProvider = MenuContext.Provider;
