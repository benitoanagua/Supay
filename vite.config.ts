import { defineConfig } from "vite";
import { resolve } from "node:path";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "./",
  plugins: [tailwindcss()],
  css: {
    devSourcemap: true,
  },
  build: {
    target: "esnext",
    minify: "esbuild",
    emptyOutDir: true,
    cssCodeSplit: false,
    outDir: "assets/dist",
    lib: {
      entry: resolve(__dirname, "src/main.ts"),
      name: "SupayElements",
      fileName: (format) => `supay-elements.${format}.js`,
      formats: ["es"],
    },
    rollupOptions: {
      output: {
        assetFileNames: "supay-elements.[ext]",
      },
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
});
