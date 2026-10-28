import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  agentRules: false,
  experimental: {
    agentUpgrade: "security",
  },
  serverExternalPackages: ["exceljs"],
  // The desk is opened at 127.0.0.1 while the dev server also answers on localhost.
  allowedDevOrigins: ["127.0.0.1", "*.agent.cvm.dev"],
}

export default nextConfig
