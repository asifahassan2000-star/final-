/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/final',
  assetPrefix: '/final/',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
