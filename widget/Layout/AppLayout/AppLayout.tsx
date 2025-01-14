import React, { memo } from 'react';
import { Footer, Header } from '@/widget/Layout';
import { Content } from '@/widget/Layout/Content';

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={'min-h-screen flex flex-col'}>
      <Header />

      <Content>{children}</Content>

      <Footer />
    </div>
  );
}

export default memo(AppLayout);
