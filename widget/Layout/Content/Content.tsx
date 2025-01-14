import { memo, HTMLAttributes } from 'react';
import clsx from 'clsx';

type ContentProps = HTMLAttributes<HTMLDivElement>;

function Content(props: ContentProps) {
  const { children, className } = props;

  return <main className={clsx('flex-1 px-safe', className)}>{children}</main>;
}

export default memo(Content);
