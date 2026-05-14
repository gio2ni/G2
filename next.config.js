/** @type {import('next').NextConfig} */
const nextConfig = {
  // Three.js doit être transpilé par Next.js pour éviter des erreurs d'import
  transpilePackages: ['three'],

  images: {
    // Autoriser les images de placehold.co pendant le développement
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

module.exports = nextConfig;
