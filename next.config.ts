import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.weatherapi.com',
        port: '',
        pathname: '/weather/**',
      },
      {
        protocol: 'https',
        hostname: 'api.weatherapi.com',
        port: '',
        pathname: '/v1/**',
      },
    ],
  },
};

export default nextConfig;
