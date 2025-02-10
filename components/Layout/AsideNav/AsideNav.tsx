import { memo } from 'react';
import { useLayoutState } from '@/atoms';
import clsx from 'clsx';
import Menu from '@/widget/Menu/Menu';
import { MenuItem } from '@/widget/Menu';

function AsideNav() {
  const { openAside } = useLayoutState();
  return (
    <aside
      className={clsx(
        'fixed top-0 bottom-0 bg-amber-700 pt-12',
        'pl-3 pr-3',
        'sm:pb-12 md:pb-12 lg:pb-0',
        'hidden sm:hidden md:hidden lg:block',
        'z-[var(--z-aside)]',
        'shadow-[6px_4px_10px_#0d131c66]',
        {
          'w-12': !openAside,
          'w-52 !block': openAside,
        },
        'overflow-y-scroll'
      )}
    >
      <Menu>
        {Array.from({ length: 10 }).map((_, index) => (
          <MenuItem key={index}></MenuItem>
        ))}
      </Menu>
      <Menu>
        {Array.from({ length: 20 }).map((_, index) => (
          <MenuItem key={index}></MenuItem>
        ))}
      </Menu>
      <Menu>
        {Array.from({ length: 5 }).map((_, index) => (
          <MenuItem key={index}></MenuItem>
        ))}
      </Menu>
    </aside>
  );
}

export default memo(AsideNav);
