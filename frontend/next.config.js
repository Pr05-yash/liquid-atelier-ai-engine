/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Yeh line Next.js ko bolegi ki rust compiler crash ho toh standard JavaScript use kare
  swcMinify: false, 
}

module.exports = nextConfig