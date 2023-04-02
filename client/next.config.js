/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    GOOGLE_OAUTH_CLIENT_ID: process.env.GOOGLE_OAUTH_CLIENT_ID,
  },
  images: {
    domains: ["lh3.googleusercontent.com", "picsum.photos"],
  },
};

module.exports = nextConfig;
