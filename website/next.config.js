/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'dist',
  trailingSlash: true,
  images: { unoptimized: true },
  experimental: {
    scrollRestoration: false
  }
}

module.exports = nextConfig
