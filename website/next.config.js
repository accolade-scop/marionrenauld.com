/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'dist',
  trailingSlash: true,
  experimental: {

    scrollRestoration: false
  }
}

module.exports = nextConfig
