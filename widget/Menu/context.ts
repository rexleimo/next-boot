import { createContext } from 'react';

export type MenuContextType = {
  open?: boolean;
  setOpen?: (open: boolean) => void;
  // 侧边栏是否展开
  isExpanded?: boolean;
  onMenuIconMouseEnter?: () => void;
  onMenuIconMouseLeave?: () => void;
};

export const MenuContext = createContext<MenuContextType>({});

export const MenuProvider = MenuContext.Provider;
