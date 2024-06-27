/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "img.kurio.network",
      "res.cloudinary.com",
      "cdn1-production-images-kly.akamaized.net",
      "awsimages.detik.net.id",
      "asset-2.tstatic.net",
      "statics.indozone.news",
      "google.com",
      "img-global.cpcdn.com",
      "asset.kompas.com",
      "thumb.viva.id",
      "i.ytimg.com",
      "www.unileverfoodsolutions.co.id",
    ],
  },
};

export default nextConfig;
