import { useEffect, useState } from 'react';

type NetworkState = {
  status: 'good' | 'slow' | 'offline';
  speed: number;
  unit: 'Mbps' | 'Kbps';
  latency: number; // ms
};

function useNetworkAdvanced() {
  const [state, setState] = useState<NetworkState>({
    status: 'good',
    speed: 0,
    unit: 'Kbps',
    latency: 50,
  });

  const updateOnlineStatus = () => {
    setState(prevState => ({
      ...prevState,
      status: navigator.onLine ? 'good' : 'offline',
    }));
  };

  // 主动带宽测量方法
  const measureBandwidth = async (): Promise<{
    speed: number;
    unit: 'Mbps' | 'Kbps';
  }> => {
    const url = `/download.png?t=${Date.now()}`;
    const startTime = Date.now();

    try {
      const res = await fetch(url);
      const blob = await res.blob();
      const sizeBytes = blob.size;
      const duration = (Date.now() - startTime) / 1000;

      // 计算 bytes per second
      const bytesPerSec = sizeBytes / duration;

      // 转换为 bits per second (1 byte = 8 bits)
      const bitsPerSec = bytesPerSec * 8;

      if (bitsPerSec >= 1000000) {
        return {
          speed: bitsPerSec / 1000000,
          unit: 'Mbps',
        };
      } else {
        return {
          speed: bitsPerSec / 1000,
          unit: 'Kbps',
        };
      }
    } catch (e) {
      console.warn('Failed to fetch bandwidth data', e);
      return {
        speed: 0,
        unit: 'Kbps',
      };
    }
  };

  // 综合检测逻辑
  const checkNetwork = async (): Promise<NetworkState> => {
    if (!navigator.onLine) {
      return {
        status: 'offline',
        speed: 0,
        unit: 'Kbps',
        latency: 0,
      };
    }

    // 优先使用原生API数据
    let speedEstimate = state.speed;
    if ('connection' in navigator) {
      const conn = (navigator as any).connection;
      speedEstimate = conn.downlink || speedEstimate;
    }

    // 主动测量验证
    const actualSpeed = await measureBandwidth();
    const validSpeed =
      actualSpeed.speed > 0 ? actualSpeed.speed : speedEstimate;

    let status: NetworkState['status'];
    if (actualSpeed.unit === 'Mbps') {
      status = validSpeed < 1 ? 'slow' : 'good';
    } else {
      status = 'slow';
    }

    return {
      status: status,
      speed: validSpeed,
      unit: actualSpeed.unit,
      latency: state.latency, // 实际项目中可添加延迟测量
    };
  };

  // 定时检测逻辑
  useEffect(() => {
    const interval = setInterval(async () => {
      const newState = await checkNetwork();
      setState(newState);
    }, 5000);

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    return () => {
      clearInterval(interval);
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  return state;
}

export default useNetworkAdvanced;
