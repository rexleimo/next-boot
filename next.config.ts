import type { NextConfig } from 'next';

const imageCacheTimeOut = 60 * 60 * 24 * 7;

const nextConfig: NextConfig = {
  /* config options here */
  // output: 'standalone',

  compress: true,

  images: {
    minimumCacheTTL: imageCacheTimeOut,
    formats: ['image/avif', 'image/webp'],
  },
  sassOptions: {},
};

export default nextConfig;
