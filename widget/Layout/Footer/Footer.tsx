import { memo, ReactNode } from 'react';
import clsx from 'clsx';

interface FooterProps {
  className?: string;
  children?: ReactNode;
}

function Footer(props: FooterProps) {
  const { className, children } = props;
  
  return <footer className={clsx('pb-safe z-[var(--z-footer)', className)}>{children}</footer>;
}

export default memo(Footer);
