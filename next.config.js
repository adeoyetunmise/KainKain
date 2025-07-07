/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Configure module resolution for framer-motion
  webpack: (config, { isServer }) => {
    // Add resolver for problematic modules
    config.resolve.alias = {
      ...config.resolve.alias,
      // Force single instance of framer-motion
      'framer-motion': require.resolve('framer-motion'),
    };
    return config;
  },
  // Opt out of font optimization if causing issues
  optimizeFonts: false,
};

module.exports = nextConfig;
