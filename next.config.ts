import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // React-PDF's default PDF.js build requires APIs missing in mobile Safari.
  turbopack: {
    resolveAlias: {
      "pdfjs-dist": "pdfjs-dist/legacy/build/pdf.mjs",
    },
  },
  webpack(config) {
    config.resolve.alias["pdfjs-dist$"] = "pdfjs-dist/legacy/build/pdf.mjs";
    return config;
  },
  experimental: {
    useTypeScriptCli: true,
  },
};

export default nextConfig;
