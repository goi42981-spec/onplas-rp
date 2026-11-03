// Standalone static build for GitHub Pages (see .github/workflows/pages.yml).
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "node:url";

export default defineConfig({
  root: "pages",
  base: process.env.PAGES_BASE || "./",
  publicDir: fileURLToPath(new URL("./public", import.meta.url)),
  plugins: [react(), tailwindcss()],
  resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } },
  build: { outDir: fileURLToPath(new URL("./dist-pages", import.meta.url)), emptyOutDir: true },
});
