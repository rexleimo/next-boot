import { memo, ReactElement, ReactNode, useContext } from 'react';
import clsx from 'clsx';
import { MenuContext } from '@/widget/Menu/context';

type ItemProps = {
  label?: string | ReactNode | ReactElement;
  children?: ReactNode | ReactElement;
};

function Item(props: ItemProps) {
  const { label, children } = props;

  const { open, isExpanded } = useContext(MenuContext);
  return (
    <a
      className={clsx(
        // layout
        'flex items-center',
        // borderRadius
        'rounded',
        // contentVisibility
        'content-visibility-auto',
        // cursor
        'cursor-pointer',
        // typography
        'text-sm font-semibold leading-[18px] tracking-tight',
        // margins
        'mb-0 mt-1.5',
        // height
        'max-h-[44px] min-h-[44px]',
        // padding
        'px-2.5 py-2.25',
        // position
        'relative',
        // transition
        'transition-colors duration-100 ease-in-out'
      )}
    >
      <div className={'font-medium h-5 mr-3 relative'}></div>
      {(open || isExpanded) && (
        <div
          className={clsx(
            'w-full',
            'flex flex-col text-sm text-ellipsis line-clamp-2 max-w-[calc(100% - 10px)]',
            'hover:text-blue-100'
          )}
        >
          {label}
          {children}
        </div>
      )}
    </a>
  );
}

export default memo(Item);
