/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  images: {
    qualities: [75, 100]
  }
};

export default nextConfig;
