/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Add output configuration to help with file system issues
  output: 'standalone',
  
  // Increase serverless function timeout
  serverRuntimeConfig: {
    // Will only be available on the server side
    timeoutSeconds: 60
  },
  
  // Disable specific features that might cause issues
  experimental: {
    // Disable features that might cause permission issues
    serverComponentsExternalPackages: [],
    optimizeCss: false
  },
  
  // Keep other valid configurations
}

module.exports = nextConfig
