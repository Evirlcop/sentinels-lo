/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['sbojnesivcuawnrpjrfu.supabase.co', 'images.pexels.com', 'via.placeholder.com'], // Updated domain
    unoptimized: true,
  },
}

export default nextConfig
