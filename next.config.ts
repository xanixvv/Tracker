import withPWA from "next-pwa";

const nextConfig = {
  reactStrictMode: true,

  // 🔥 THIS FIXES YOUR ERROR
  turbopack: {},

  images: {
    domains: [],
  },
};

export default withPWA({
  ...nextConfig,
  pwa: {
    dest: "public",
    disable: process.env.NODE_ENV === "development",
  },
});