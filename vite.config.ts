import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    strictPort: true,
    allowedHosts: [
      "fhjf37-5173.csb.app", // 👈 match this EXACT host
    ],
  },
});
