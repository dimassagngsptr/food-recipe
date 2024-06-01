/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "**.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn1-production-images-kly.akamaized.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "awsimages.detik.net.id",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
