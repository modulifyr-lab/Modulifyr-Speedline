/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    // Allow next/image to serve files from the /public directory.
    // This is required for Image components with src="/filename.png" to work correctly.
    // Add remote hostnames here when you introduce CDN-hosted art assets.
    remotePatterns: [],
    // Local image optimization is enabled by default for /public files.
    // No additional config needed for src="/banjhakri.png" etc.
  },
}

export default nextConfig
