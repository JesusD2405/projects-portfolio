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
  // Exclude server-only Node.js modules from webpack bundling.
  // These are only used in API routes (server runtime), never on the client.
  serverExternalPackages: [
    "nodemailer",
    "nodemailer-express-handlebars",
    "express-handlebars",
    "handlebars",
  ],
  env: {
    ROOT_EMAIL_TEMPLATES: __dirname + "/src/utils/emails/templates/",
  },
};

export default nextConfig;
