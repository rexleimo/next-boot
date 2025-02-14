import { createContext } from 'react';

interface MenuContextType {
  open?: boolean;
  setOpen?: (open: boolean) => void;
  // 侧边栏是否展开
  isExpanded?: boolean;
}

export const MenuContext = createContext<MenuContextType>({});

export const MenuProvider = MenuContext.Provider;
