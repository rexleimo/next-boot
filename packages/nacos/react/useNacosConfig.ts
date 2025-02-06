'use client';

import { useEffect, useState } from 'react';

function useNacosConfig() {
  const [config, setConfig] = useState();

  useEffect(() => {
    const eventSource = new EventSource('/api/nacos');
    eventSource.onmessage = event => {
      if (event.data === 'ping') {
        return;
      }
      setConfig(JSON.parse(event.data));
    };

    eventSource.onerror = error => {
      console.error('EventSource error:', error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return config;
}

export default useNacosConfig;
