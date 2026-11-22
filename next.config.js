// Cleanly normalize NODE_ENV for production builds if environment pre-assigned 'development'
if (process.env.NODE_ENV === 'development' && (process.argv.includes('build') || process.env.npm_lifecycle_event === 'build')) {
  delete process.env.NODE_ENV;
}

const isGitHubPages = Boolean(process.env.GITHUB_ACTIONS || process.env.GITHUB_PAGES);

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: isGitHubPages ? 'export' : undefined,
  // On GitHub Pages, repository is hosted at /final; on Vercel and production hosting, hosted at root /
  basePath: isGitHubPages ? '/final' : '',
  assetPrefix: isGitHubPages ? '/final/' : undefined,
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
