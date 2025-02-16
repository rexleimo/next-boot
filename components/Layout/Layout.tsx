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
import { NetworkStatusAdvanced } from '@/packages/NetworkAdvanced';
import { Logo } from '@/components/Layout/Header';

function Layout({ children }: { children: React.ReactNode }) {
  const { openAside } = useLayoutState();

  return (
    <WebLayout>
      <NetworkStatusAdvanced />
      <Header>
        <nav className={'h-12 shadow bg-white'}>
          <Logo />
        </nav>
      </Header>

      <AsideNav />

      <Content
        className={clsx('sm:pl-0 md:pl-0 lg:pl-12', {
          '!pl-52': openAside,
        })}
      >
        <div className={'container mx-auto'}>{children}</div>
        <Footer className={'bg-amber-300'}>
          <div className={'container mx-auto'}>
            <nav className={'h-12'}>Footer</nav>
          </div>
        </Footer>
      </Content>

      <MobileMenu />
      <MaskLayout open={false} />
    </WebLayout>
  );
}

export default Layout;
