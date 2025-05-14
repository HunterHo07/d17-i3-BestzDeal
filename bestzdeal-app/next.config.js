/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/bestzdeal',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  distDir: 'out',
};

module.exports = nextConfig;
