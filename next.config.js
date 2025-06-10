/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  // Ensure SWC is used instead of Babel
  swcMinify: true,
  experimental: {
    // Enable SWC for faster builds
    forceSwcTransforms: true,
  },
};

module.exports = nextConfig;