'use client';

import {
  Layout as WebLayout,
  Header,
  Footer,
  Content,
  MaskLayout,
} from '@/widget/Layout';
import { MobileMenu } from '@/components';
import { AsideNav } from '@/components/Layout/AsideNav';
import { useLayoutState } from '@/atoms';

function Layout({ children }: { children: React.ReactNode }) {
  const { openAside, toggleAside } = useLayoutState();
  return (
    <WebLayout>
      <Header>
        <nav
          className={'h-12 bg-amber-300'}
          onClick={() => toggleAside(!openAside)}
        ></nav>
      </Header>

      <AsideNav />

      <Content>
        {children}
        <Footer>
          <nav className={'h-12 bg-amber-300'}></nav>
        </Footer>
      </Content>

      <MobileMenu />
      <MaskLayout open={openAside} />
    </WebLayout>
  );
}

export default Layout;
