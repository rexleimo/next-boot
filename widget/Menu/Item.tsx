import { memo } from 'react';
import clsx from 'clsx';

function Item() {
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
      <div
        className={
          'flex flex-col text-sm text-ellipsis line-clamp-2 max-w-[calc(100% - 10px)]'
        }
      >
        BetFury 原创
      </div>
    </a>
  );
}

export default memo(Item);
