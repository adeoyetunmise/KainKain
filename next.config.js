/** @type {import('next').NextConfig} */
const nextConfig = {
  // Modern Next.js 15+ configuration
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Add any other valid Next.js 15.2.0 options here
}

module.exports = nextConfig
