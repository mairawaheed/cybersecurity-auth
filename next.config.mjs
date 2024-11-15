/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals = [
      ...config.externals,
      "bcrypt",
      "@serialport/bindings-cpp",
    ];
    return config;
  },
};

export default nextConfig;
