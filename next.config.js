/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'standalone', // for next 12.2.x
  reactStrictMode: true,
  
  experimental: {
    outputStandalone: true,
  },
}
module.exports = nextConfig
