/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    qualities: [75, 100]
  },
  async redirects() {
    return [
      // www → non-www
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.technocratsdigimate.com" }],
        destination: "https://technocratsdigimate.com/:path*",
        permanent: true,
      },
      // Old WordPress pages → current equivalents
      { source: "/real-estate.html", destination: "/real-estate-growth-audit", permanent: true },
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/home", destination: "/", permanent: true },
      { source: "/home/", destination: "/", permanent: true },
      { source: "/contact-us", destination: "/audit", permanent: true },
      { source: "/contact-us/", destination: "/audit", permanent: true },
      { source: "/testimonial", destination: "/#proof", permanent: true },
      { source: "/testimonial/", destination: "/#proof", permanent: true },
      { source: "/search-engine-optimization", destination: "/services/performance-marketing-lead-generation", permanent: true },
      { source: "/search-engine-optimization/", destination: "/services/performance-marketing-lead-generation", permanent: true },
      // Old blog URL formats → current blog
      { source: "/blog/mellstroy", destination: "/blog", permanent: true },
      { source: "/blog/mellstroy/", destination: "/blog", permanent: true },
      { source: "/blog/2025/:path*", destination: "/blog", permanent: true },
      { source: "/what-are-the-7-email-marketing-strategies", destination: "/blog", permanent: true },
      { source: "/what-are-the-7-email-marketing-strategies/", destination: "/blog", permanent: true },
      { source: "/blog/what-are-the-7-email-marketing-strategies", destination: "/blog", permanent: true },
      { source: "/blog/what-are-the-7-email-marketing-strategies/", destination: "/blog", permanent: true },
    ];
  },
};

export default nextConfig;
