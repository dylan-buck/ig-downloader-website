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
  // Ensure CSS modules work properly
  webpack: (config) => {
    config.module.rules.push({
      test: /\.css$/,
      use: ['style-loader', 'css-loader', 'postcss-loader'],
    });
    return config;
  },
}

module.exports = nextConfig 