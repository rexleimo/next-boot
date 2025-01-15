import React from 'react';

import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { StorageProvider, Layout } from '@/components';
import Script from 'next/script';

import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

import '@/styles/main.scss';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
  userScalable: false,
  viewportFit: 'cover', // 适配刘海屏
};

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
  manifest: '/manifest.json',
  icons: {
    icon: '/icons/favicon_KB.ico',
    apple: '/icons/favicon_KB.ico',
  },
  appleWebApp: {
    statusBarStyle: 'black',
  },
};

export async function generateStaticParams() {
  return [{ locale: 'en' }];
}

export const dynamic = 'force-static';

type Params = Promise<{ locale: string }>;

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Params;
}>) {
  // Ensure that the incoming `locale` is valid

  const { locale } = await params;
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html className={'min-h-screen'} lang={locale}>
      <head>
        <meta name="theme-color" content="#000000" />
        <link rel={'stylesheet'} href={'/iconfont/iconfont.css'} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        <StorageProvider>
          <NextIntlClientProvider messages={messages}>
            <Layout>{children}</Layout>
          </NextIntlClientProvider>
        </StorageProvider>
        {process.env.NODE_ENV === 'production' && (
          <Script src={'/register-sw.js'} />
        )}
      </body>
    </html>
  );
}
