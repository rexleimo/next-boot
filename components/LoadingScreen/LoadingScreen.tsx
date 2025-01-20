'use client';
import { memo } from 'react';
import styles from './styles.module.scss';
import clsx from 'clsx';

function LoadingScreen() {
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
