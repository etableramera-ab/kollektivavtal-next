/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  async redirects() {
    return [
      { source: "/avtal/bokforingsbyr%C3%A5-avtal", destination: "/avtal/bokforingsbyra-avtal", permanent: true },
      { source: "/avtal/cirkul%C3%A4rtekniker", destination: "/avtal/cirkulartekniker", permanent: true },
    ];
  },
};

export default nextConfig;
