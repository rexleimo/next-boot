'use client';

import { Layout as WebLayout, Header, Footer, Content } from '@/widget/Layout';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <WebLayout>
      <Header>
        <nav className={'h-12 bg-amber-300'}></nav>
      </Header>
      <Content>{children}</Content>
      <Footer>
        <nav className={'h-12 bg-amber-300'}></nav>
      </Footer>
    </WebLayout>
  );
}

export default Layout;
