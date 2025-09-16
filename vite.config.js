import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

export default defineConfig({
  plugins: [
    svelte({
      compilerOptions: {
        customElement: true,
      },
    }),
  ],
  build: {
    lib: {
      entry: "./src/elements/index.ts",
      name: "SvelteComponents",
      formats: ["iife"],
    },
    rollupOptions: {
      output: {
        entryFileNames: "svelte-bundle.js",
      },
    },
  },
});
