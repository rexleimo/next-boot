'use client';

import { Layout as WebLayout, Header, Footer, Content } from '@/widget/Layout';
import { MobileMenu } from '@/components';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <WebLayout>
      <Header>
        <nav className={'h-12 bg-amber-300'}></nav>
      </Header>
      <Content>
        {children}
        <Footer>
          <nav className={'h-12 bg-amber-300'}></nav>
        </Footer>
      </Content>
      <MobileMenu />
    </WebLayout>
  );
}

export default Layout;
