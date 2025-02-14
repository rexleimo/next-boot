import { memo, useEffect, useRef, useState } from 'react';
import { useLayoutState } from '@/atoms';
import clsx from 'clsx';
import Menu from '@/widget/Menu/Menu';
import MenuItem from '@/widget/Menu/Item';

import SimplebarReact from 'simplebar-react';

function AsideNav() {
  const { openAside } = useLayoutState();
  const asideRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    // 监听asideRef的高度变化
    const handleResize = () => {
      if (asideRef.current) {
        const height = asideRef.current.getBoundingClientRect().height;
        const pt = parseInt(getComputedStyle(asideRef.current).paddingTop);
        const pb = parseInt(getComputedStyle(asideRef.current).paddingBottom);
        setHeight(height - pt - pb);
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);

    if (asideRef.current) {
      resizeObserver.observe(asideRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <aside
      ref={asideRef}
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
    >
      <SimplebarReact
        className={clsx('pl-3 pr-3')}
        style={{ maxHeight: height }}
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <Menu key={i} label={'text'} isExpanded={openAside}>
            {Array.from({ length: 10 }).map((_, index) => (
              <MenuItem key={index}></MenuItem>
            ))}
          </Menu>
        ))}
      </SimplebarReact>
    </aside>
  );
}

export default memo(AsideNav);
