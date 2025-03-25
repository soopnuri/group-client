const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin');

const withVanillaExtract = createVanillaExtractPlugin();

const nextConfig = {
  images: {
    unoptimized: true,
    loader: 'imgix',
    path: 'http://localhost:3000',
    // domains: ['']
  },
};

// Apply plugins
module.exports = withVanillaExtract(nextConfig);