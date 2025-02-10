import { HTMLAttributes, memo, useState } from 'react';
import Title from '@/widget/Menu/Title';
import { MenuProvider } from '@/widget/Menu/context';
import { motion } from 'framer-motion';

export type MenuProps = HTMLAttributes<HTMLDivElement>;

function Menu(props: MenuProps) {
  const { children } = props;
  const [open, setOpen] = useState(false);

  return (
    <MenuProvider
      value={{
        open,
        setOpen,
      }}
    >
      <div className={'cursor-pointer'}>
        <Title />

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
