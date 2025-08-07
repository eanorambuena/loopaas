/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'api.microlink.io', // Microlink Image Preview
    ],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint warnings.
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
