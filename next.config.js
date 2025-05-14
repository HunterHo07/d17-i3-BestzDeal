/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/bestzdeal',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

module.exports = nextConfig;
