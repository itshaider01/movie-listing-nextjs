/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true, // Ensure this is enabled for the app directory structure
  },
  images: {
    domains: ["movie-app-buckets.s3.us-east-1.amazonaws.com"],
  },
  output: "standalone", // Required for AWS Amplify SSR support
};

module.exports = nextConfig;
