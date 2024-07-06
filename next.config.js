/** @type {import('next').NextConfig} */
const nextConfig = {
  // distDir: 'build',
  // output: 'export',

  // async generateStaticParams() {
  //   return {
  //     '/': { page: '/' },
  //     '/favoritePosts': { page: '/favoritePosts' },
  //     '/login': { page: '/login' },
  //     '/myGarden': { page: '/myGarden' },
  //     '/myRecipes': { page: '/myRecipes' },
  //     '/newRecipe': { page: '/newRecipe' },
  //     '/profile': { page: '/profile' },
  //     '/recipes/:id': { page: '/recipes/[id]' },
  //     '/register': { page: '/register' },
  //     '/users': { page: '/users' },
  //     '/editRecipe/:id': { page: '/editRecipe/[id]' }, // Add more pages as needed
  //   };
  // },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
      },
    ],
  },
};

module.exports = nextConfig;
