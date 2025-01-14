import React, { HTMLAttributes, memo } from 'react';
import clsx from 'clsx';

type HeaderProps = HTMLAttributes<HTMLDivElement>;

function Header({ children, className }: HeaderProps) {
  return (
    <header className={clsx('sticky top-0 pt-safe', className)}>
      {children}
    </header>
  );
}

export default memo(Header);
