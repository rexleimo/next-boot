import { useAtom } from 'jotai/index';
import { sysConfigAtom } from '@/atoms/useSysConfig/atoms';
import { useNacosConfig } from '@/packages/nacos/react';
import { useEffect } from 'react';

function useSysConfig() {
  'use client';
  const [sysConfig, setSysConfig] = useAtom(sysConfigAtom);
  const config = useNacosConfig();

  useEffect(() => {
    if (config) {
      setSysConfig(config);
    }
  }, [config, setSysConfig]);

  return sysConfig;
}

export default useSysConfig;
