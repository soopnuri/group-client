const { createVanillaExtractPlugin } = require("@vanilla-extract/next-plugin");

const withVanillaExtract = createVanillaExtractPlugin();

const nextConfig = {
  images: {
    unoptimized: true,
    loader: "imgix",
    path: "http://localhost:3000",
    // domains: ['']
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: '/proxy-api/:path*',
  //       destination: 'http://localhost:3001/:path*'
  //     }
  //   ]
  // }
};

// Apply plugins
module.exports = withVanillaExtract(nextConfig);
