import { memo, useMemo } from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

function DotItem({
  active,
  delay,
  onDotClick,
}: {
  active: boolean;
  delay?: number;
  onDotClick?: () => void;
}) {
  const nextDelay = useMemo(() => {
    const result = delay || 2500;
    return result / 1000;
  }, [delay]);

  return (
    <span
      className={clsx('inline-flex  h-2 rounded-full  bg-amber-700', {
        'w-12': active,
        'w-6': !active,
      })}
      onClick={onDotClick}
    >
      {active && (
        <motion.span
          className={'bg-amber-950 rounded-full h-full'}
          initial={{ width: '10%' }}
          animate={{ width: '100%' }}
          transition={{
            duration: nextDelay,
            ease: 'easeInOut',
            repeatDelay: 0,
          }}
        ></motion.span>
      )}
    </span>
  );
}

export default memo(DotItem);
