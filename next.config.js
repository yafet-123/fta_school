/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
<<<<<<< HEAD
  swcMinify: false, // Disable SWC minification
  compiler: {
    // Disable SWC compiler completely
  },
  webpack: (config, { isServer }) => {
    // Fallback for fs module
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
=======
  swcMinify: true,
  images:{
    domains:['res.cloudinary.com', "images.unsplash.com"]
>>>>>>> 0306f37bdbd9c29dc14158fb38dab803e1b3073a
  },
}

module.exports = nextConfig
