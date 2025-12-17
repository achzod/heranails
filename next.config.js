/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['images.unsplash.com', 'scontent.cdninstagram.com', 'instagram.com'],
  },
}

module.exports = nextConfig



