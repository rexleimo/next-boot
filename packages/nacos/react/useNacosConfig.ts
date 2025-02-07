'use client';

import { useEffect, useState } from 'react';
import { eventSourceManager } from '@/packages/nacos/react/EventSourceManager';

function useNacosConfig() {
  const [config, setConfig] = useState();

  useEffect(() => {
    return eventSourceManager.subscribe(setConfig);
  }, []);
  return config;
}

export default useNacosConfig;
