'use client';
import { memo, useEffect, useState } from 'react';
import styles from './styles.module.scss';
import clsx from 'clsx';

function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  console.log(progress);

  useEffect(() => {
    // 计算总资源数
    const totalResources = performance.getEntriesByType('resource').length;
    if (totalResources === 0) {
      // 如果没有资源需要加载，立即关闭加载屏幕
      setIsLoading(false);
      return;
    }

    // 监听资源加载完成
    const handleResourceLoad = () => {
      const assets = performance.getEntriesByType(
        'resource'
      ) as PerformanceResourceTiming[];

      const loadedResources = assets.filter(
        entry => entry.responseEnd > 0
      ).length;

      const currentProgress = Math.min(
        (loadedResources / totalResources) * 100,
        100
      );
      setProgress(currentProgress);

      if (loadedResources >= totalResources) {
        setIsLoading(false);
      }
    };

    // 初始计算已加载的资源
    handleResourceLoad();

    // 定期检查资源加载状态
    const interval = setInterval(handleResourceLoad, 1000);

    // 监听 window load 事件，确保所有资源加载完成
    const onLoad = () => {
      setProgress(100);
      setIsLoading(false);
    };
    window.addEventListener('load', onLoad);

    return () => {
      clearInterval(interval);
      window.removeEventListener('load', onLoad);
    };
  }, []);

  if (!isLoading) {
    return null;
  }

  return (
    <div
      className={clsx(
        'fixed top-0 left-0 w-full h-full bg-white z-[var(--z-loading-screen)] flex items-center justify-center',
        styles.progress
      )}
    >
      <div className="absolute top-0 left-0 progress-bar h-2 w-full">
        <div
          className={clsx(
            styles.progressFill,
            'h-2',
            'rounded-tr-2xl rounded-br-2xl'
          )}
        />
      </div>
      加载中。。。
    </div>
  );
}

export default memo(LoadingScreen);
