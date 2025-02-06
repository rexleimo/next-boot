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
import clsx from 'clsx';

function Layout({ children }: { children: React.ReactNode }) {
  const { openAside, toggleAside } = useLayoutState();

  return (
    <WebLayout>
      <Header>
        <nav
          className={'h-12 bg-amber-300'}
          onClick={() => toggleAside(!openAside)}
        >
          点击打开侧边栏
        </nav>
      </Header>

      <AsideNav />

      <Content
        className={clsx('sm:pl-0 md:pl-0 lg:pl-12', {
          '!pl-52': openAside,
        })}
      >
        {children}
        <Footer>
          <nav className={'h-12 bg-amber-300'}>Footer</nav>
        </Footer>
      </Content>

      <MobileMenu />
      <MaskLayout open={openAside} />
    </WebLayout>
  );
}

export default Layout;
