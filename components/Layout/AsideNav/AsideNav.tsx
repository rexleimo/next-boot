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
          <Menu
            key={i}
            label={'text'}
            icon={
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.537 12.625a4.421 4.421 0 0 0 2.684 4.047 10.96 10.96 0 0 1-1.384 2.845c-.834 1.218-1.7 2.432-3.062 2.457-1.34.025-1.77-.794-3.3-.794-1.531 0-2.01.769-3.275.82-1.316.049-2.317-1.318-3.158-2.532-1.72-2.484-3.032-7.017-1.27-10.077A4.9 4.9 0 0 1 8.91 6.884c1.292-.025 2.51.869 3.3.869.789 0 2.27-1.075 3.828-.917a4.67 4.67 0 0 1 3.66 1.984 4.524 4.524 0 0 0-2.16 3.805m-2.52-7.432A4.4 4.4 0 0 0 16.06 2a4.482 4.482 0 0 0-2.945 1.516 4.185 4.185 0 0 0-1.061 3.093 3.708 3.708 0 0 0 2.967-1.416Z" />
              </svg>
            }
            isExpanded={openAside}
          >
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
