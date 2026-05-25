/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'drive.google.com',
      },
      {
        protocol: 'https',
        hostname: 'docs.google.com',
      },
      {
        protocol: 'https',
        hostname: '*.media-amazon.com',
      },
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
      },
      {
        protocol: 'https',
        hostname: '*.ssl-images-amazon.com',
      },
      {
        protocol: 'https',
        hostname: '*.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'assets.myntassets.com',
      },
      {
        protocol: 'https',
        hostname: '*.myntassets.com',
      },
      {
        protocol: 'https',
        hostname: 'images-static.nykaa.com',
      },
      {
        protocol: 'https',
        hostname: '*.nykaa.com',
      },
    ],
  },
};
export default nextConfig;
