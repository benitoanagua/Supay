import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    tailwindcss(),
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
