import {
  HTMLAttributes,
  memo,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import Title, { TitleProps } from '@/widget/Menu/Title';
import { MenuContextType, MenuProvider } from '@/widget/Menu/context';
import { motion, MotionStyle } from 'framer-motion';
import clsx from 'clsx';

export type MenuProps = HTMLAttributes<HTMLDivElement> & {
  isExpanded?: boolean;
} & TitleProps;

function Menu(props: MenuProps) {
  const { children, isExpanded, label, icon } = props;
  const [open, setOpen] = useState(false);
  const selfRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const onMenuIconMouseEnter = useCallback(() => {
    if (!isExpanded) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      setOpen(true);
    }
  }, [isExpanded]);

  const onMenuIconMouseLeave = useCallback(() => {
    if (!isExpanded) {
      timerRef.current = setTimeout(() => {
        setOpen(false);
      }, 80);
    }
  }, [isExpanded]);

  const value = useMemo((): MenuContextType => {
    return {
      open,
      isExpanded,
      setOpen,
      onMenuIconMouseEnter,
      onMenuIconMouseLeave,
    };
  }, [open, isExpanded, onMenuIconMouseEnter, onMenuIconMouseLeave]);

  const motionProps = useMemo(() => {
    if (isExpanded) {
      return {
        initial: { maxHeight: 0 },
        animate: { maxHeight: window.innerHeight },
        transition: { duration: 0.375 },
      };
    } else {
      const top = selfRef.current?.getBoundingClientRect().top;
      return {
        initial: { width: 0 },
        animate: { width: 200 },
        style: {
          position: 'fixed',
          top: top,
          left: '3.5rem',
          background: 'red',
        } as MotionStyle,
      };
    }
  }, [isExpanded]);

  return (
    <MenuProvider value={value}>
      <div
        ref={selfRef}
        className={'cursor-pointer group'}
        onMouseEnter={onMenuIconMouseEnter}
        onMouseLeave={onMenuIconMouseLeave}
      >
        <Title label={label} icon={icon} />
        {open && (
          <motion.div
            className={clsx({
              rounded: !isExpanded,
            })}
            {...motionProps}
          >
            {children}
          </motion.div>
        )}
      </div>
    </MenuProvider>
  );
}

export default memo(Menu);
