import { defineConfig } from "vite";
import { resolve } from "node:path";
import tailwindcss from "@tailwindcss/vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    tailwindcss(),
    dts({
      entryRoot: "src",
      tsconfigPath: "./tsconfig.json",
      insertTypesEntry: true,
      exclude: ["src/**/*.stories.ts"],
    }),
  ],
  build: {
    target: "es2021",
    cssCodeSplit: false,
    outDir: "dist",
    lib: {
      entry: resolve(__dirname, "src/main.ts"),
      name: "StrataElements",
      fileName: () => "strata-components.es.js",
      formats: ["es"],
    },
    rollupOptions: { external: ["lit"] },
  },
});