/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Required for Netlify deployment
  output: 'standalone',
  // Image configuration
  images: {
    unoptimized: true,
    domains: ['www.instagram.com'],
  },
}

module.exports = nextConfig 