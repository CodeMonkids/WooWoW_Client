/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  reactStrictMode: true,
  // api: {
  //   bodyParser: {
  //     sizeLimit: "1mb",
  //   },
  // },
  images: {
    domains: [
      'i.namu.wiki',
      'cafeptthumb-phinf.pstatic.net',
      'render.worldofwarcraft.com',
    ],
  },
};

module.exports = nextConfig;
