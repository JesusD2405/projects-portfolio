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
  env: {
    ROOT_EMAIL_TEMPLATES: __dirname + "/src/utils/emails/templates/",
  },
};

export default nextConfig;
