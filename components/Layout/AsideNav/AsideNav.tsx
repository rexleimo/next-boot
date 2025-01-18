import { memo } from 'react';
import { useLayoutState } from '@/atoms';
import clsx from 'clsx';

function AsideNav() {
  const { openAside } = useLayoutState();
  return (
    <aside
      className={clsx(
        'fixed top-0 bottom-0 bg-amber-700 pt-12',
        'sm:pb-12 md:pb-12 lg:pb-0',
        'hidden sm:hidden md:hidden lg:block',
        'z-[var(--z-aside)]',
        'shadow-[6px_4px_10px_#0d131c66]',
        {
          'w-12': !openAside,
          'w-52 !block': openAside,
        }
      )}
    ></aside>
  );
}

export default memo(AsideNav);
