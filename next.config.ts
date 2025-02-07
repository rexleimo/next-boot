import type { NextConfig } from 'next';
import withBundleAnalyzer from '@next/bundle-analyzer';
import createNextIntlPlugin from 'next-intl/plugin';

const imageCacheTimeOut = 60 * 60 * 24 * 7;

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  /* config options here */
  // output: 'export',

  compress: true,
  // 高速CDN缓存时间
  expireTime: imageCacheTimeOut,

  experimental: {
    optimizePackageImports: ['react', 'react-dom', 'swiper', 'framer-motion'],
    optimizeCss: true,
  },

  httpAgentOptions: {
    keepAlive: false,
  },

  onDemandEntries: {
    pagesBufferLength: 5,
  },
  reactStrictMode: false,

  images: {
    minimumCacheTTL: imageCacheTimeOut,
    formats: ['image/avif', 'image/webp'],
  },
  sassOptions: {},
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.externals = {
        ...config.externals,
      };
    }
    return config;
  },
};

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})(withNextIntl(nextConfig));
