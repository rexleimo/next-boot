import type { NextConfig } from 'next';

const imageCacheTimeOut = 60 * 60 * 24 * 7;

const nextConfig: NextConfig = {
  /* config options here */
  // output: 'standalone',

  images: {
    minimumCacheTTL: imageCacheTimeOut,
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
