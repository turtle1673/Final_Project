import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "zerfvnptrloomcfkmmth.supabase.co", // ✅ เพิ่ม domain ของ Supabase
    ],
  },
}

export default nextConfig;
