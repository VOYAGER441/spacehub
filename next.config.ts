/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.nasa.gov",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
