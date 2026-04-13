import { defineConfig } from "vite";
import basicSsl from "@vitejs/plugin-basic-ssl";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  // GitHub Pages에서 /projects/project4/dist/ 경로로 서빙될 것을 가정
  base: "/projects/project4/dist/",
  plugins: [react(), basicSsl()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true,
    https: true,
    port: 5173,
    strictPort: true,
  },
});

