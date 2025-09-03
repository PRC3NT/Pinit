/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow external access
  experimental: {
    serverComponentsExternalPackages: [],
  },
  // Configure for external access
  async rewrites() {
    return []
  },
  webpack: (config, { isServer }) => {
    // Fix for undici compatibility issue with Node.js 22
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
        stream: false,
        url: false,
        zlib: false,
        http: false,
        https: false,
        assert: false,
        os: false,
        path: false,
      };
    }

    // Exclude undici from webpack processing on client side
    config.externals = config.externals || [];
    if (!isServer) {
      config.externals.push('undici');
    }

    return config;
  },
}

module.exports = nextConfig
