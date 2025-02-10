import clsx from 'clsx';
import { HTMLAttributes, useContext } from 'react';
import { MenuContext } from '@/widget/Menu/context';

export type LabelProps = HTMLAttributes<HTMLButtonElement>;

function Label(props: LabelProps) {
  const { open, setOpen } = useContext(MenuContext);
  const {} = props;

  return (
    <button
      type="button"
      className={clsx(
        // Base
        'text-sm font-medium rounded flex items-center justify-center',
        'w-7 h-7',

        // Colors
        'text-white',
        'bg-blue-700 hover:bg-blue-800',
        'dark:bg-blue-600 dark:hover:bg-blue-700',

        // Focus
        'dark:focus:ring-blue-800'
      )}
      onClick={() => setOpen?.(!open)}
    >
      <svg
        className={clsx(
          'w-5 h-5 text-white dark:text-white transition-transform duration-300',
          {
            'rotate-180': open,
          }
        )}
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m19 9-7 7-7-7"
        />
      </svg>
    </button>
  );
}

export default Label;
