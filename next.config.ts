/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warning: This allows you to deploy with errors
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;