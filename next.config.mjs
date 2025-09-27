/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/${process.env.NEXT_PUBLIC_API_VERSION || 'v1'}/:path*`,
      },
    ]
  },
};

export default nextConfig;
