import type { NextConfig } from 'next';

const imageCacheTimeOut = 60 * 60 * 24 * 7;

const nextConfig: NextConfig = {
  /* config options here */
  // output: 'standalone',

  compress: false,
  // 高速CDN缓存时间
  expireTime: imageCacheTimeOut,

  httpAgentOptions: {
    keepAlive: false,
  },

  onDemandEntries: {
    pagesBufferLength: 5,
  },

  images: {
    minimumCacheTTL: imageCacheTimeOut,
    formats: ['image/avif', 'image/webp'],
  },
  sassOptions: {},
};

export default nextConfig;
