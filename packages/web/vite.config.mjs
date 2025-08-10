import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  define: {
    // Inject environment variables into the client-side code
    "window.__TRACKING_URL__": JSON.stringify(process.env.VITE_TRACKING_URL),
    "window.__SITE_ID__": JSON.stringify(process.env.VITE_SITE_ID),
  },
});
