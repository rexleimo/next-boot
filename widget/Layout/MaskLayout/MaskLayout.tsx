import { memo } from 'react';
import clsx from 'clsx';

function MaskLayout({ open }: { open: boolean }) {
  return (
    <div
      className={clsx(
        'fixed top-0 left-0 w-full bg-[#00000080] z-[var(--z-mask)]',
        'transition-[opacity_.15s,height_0s_linear_0s]',
        {
          'opacity-0': !open,
          'opacity-100  h-full': open,
        }
      )}
    />
  );
}

export default memo(MaskLayout);
