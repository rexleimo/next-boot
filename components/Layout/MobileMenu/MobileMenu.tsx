import { HTMLAttributes, memo } from 'react';
import clsx from 'clsx';

type MobileMenuProps = HTMLAttributes<HTMLDivElement>;

function MobileMenu(props: MobileMenuProps) {
  const { className, ...restProps } = props;
  return (
    <div
      className={clsx(
        'fixed w-full bottom-0 h-12 bg-amber-600',
        'sm:block md:block lg:hidden',
        'z-[var(--z-footer)]',
        className
      )}
      {...restProps}
    />
  );
}

export default memo(MobileMenu);
