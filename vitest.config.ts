import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: "jsdom",
      setupFiles: ["./test/setup.ts"],
      clearMocks: true,
      restoreMocks: true,
      coverage: {
        provider: "v8",
        reporter: ["text", "html", "lcov"],
        exclude: [
          "src/**/*.stories.ts",
          "src/types/**",
          "src/plugins/material-theme/cli.ts",
        ],
      },
    },
  }),
);
