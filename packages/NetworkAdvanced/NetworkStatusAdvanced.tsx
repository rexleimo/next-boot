import useNetworkAdvanced from './useNetworkAdvanced';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

function NetworkStatusAdvanced() {
  const { status, speed, unit } = useNetworkAdvanced();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (status != 'good') {
      setVisible(true);

      const timer = setTimeout(() => {
        setVisible(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [status]);

  const getStatusData = () => {
    switch (status) {
      case 'slow':
        return {
          icon: null,
          message: `当前网速较慢 (${speed.toFixed(1)}${unit})`,
          color: 'bg-yellow-100 border-yellow-300 text-yellow-800',
        };
      case 'offline':
        return {
          icon: null,
          message: '网络连接已断开',
          color: 'bg-red-100 border-red-300 text-red-800',
        };
      default:
        return null;
    }
  };
  console.log(visible, 'visible');
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          style={{ zIndex: 'var(--z-network)' }}
          initial={{ opacity: 0, y: 20, right: 0 }}
          animate={{ opacity: 1, y: 0, right: 0 }}
          exit={{ opacity: 0, y: -20, right: 0 }}
          className={`network fixed bottom-4 right-4 p-4 rounded-lg flex items-center gap-3 shadow-lg ${getStatusData()?.color}`}
        >
          {getStatusData()?.icon}
          <span className="text-sm font-medium">
            {getStatusData()?.message}
          </span>
          <button
            onClick={() => setVisible(false)}
            className="ml-4 text-sm font-semibold hover:opacity-75"
          >
            关闭
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default NetworkStatusAdvanced;
