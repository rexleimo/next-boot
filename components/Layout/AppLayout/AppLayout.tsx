import React, { memo } from 'react';

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={'min-h-screen flex flex-col'}>
      <header className={'sticky top-0 pt-safe bg-amber-200 h-2'}>
        <nav className={'px-safe mx-auto w-full max-w-7xl'}></nav>
      </header>

      <main className={'flex-1 px-safe'}>{children}</main>

      <footer className={'pb-safe h-2 bg-amber-300'}></footer>
    </div>
  );
}

export default memo(AppLayout);
