import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  basePath: "/projects-portfolio",
  trailingSlash: true, // Mejora la compatibilidad con GitHub Pages
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
};

export default nextConfig;
