import {
  HTMLAttributes,
  memo,
  useMemo,
  useState,
  ReactNode,
  ReactElement,
} from 'react';
import Title, { TitleProps } from '@/widget/Menu/Title';
import { MenuProvider } from '@/widget/Menu/context';
import { motion } from 'framer-motion';

export type MenuProps = HTMLAttributes<HTMLDivElement> & {
  isExpanded?: boolean;
} & TitleProps;

function Menu(props: MenuProps) {
  const { children, isExpanded, label, icon } = props;
  const [open, setOpen] = useState(false);

  const value = useMemo(() => {
    return {
      open,
      isExpanded,
      setOpen,
    };
  }, [open, isExpanded]);

  return (
    <MenuProvider value={value}>
      <div className={'cursor-pointer'}>
        <Title label={label} icon={icon} />

        {open && (
          <motion.div
            className={'overflow-hidden'}
            initial={{ maxHeight: 0 }}
            animate={{ maxHeight: window.innerHeight }}
            transition={{ duration: 0.375 }}
          >
            {children}
          </motion.div>
        )}
      </div>
    </MenuProvider>
  );
}

export default memo(Menu);
