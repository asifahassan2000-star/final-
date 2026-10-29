// Cleanly normalize NODE_ENV for production builds if environment pre-assigned 'development'
if (process.env.NODE_ENV === 'development' && (process.argv.includes('build') || process.env.npm_lifecycle_event === 'build')) {
  delete process.env.NODE_ENV;
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  trailingSlash: false,
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
