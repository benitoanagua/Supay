import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./visual",
  snapshotPathTemplate:
    "{testDir}/__screenshots__/{projectName}/{testFilePath}/{arg}{ext}",
  expect: {
    toHaveScreenshot: { animations: "disabled", caret: "hide", scale: "css" },
  },
  use: {
    baseURL: "http://127.0.0.1:6006",
    colorScheme: "light",
    viewport: { width: 390, height: 844 },
  },
  projects: [{ name: "mobile", use: { ...devices["Pixel 7"] } }],
  webServer: {
    command:
      "CI=true pnpm --filter @strata/storybook storybook -- --host 127.0.0.1",
    url: "http://127.0.0.1:6006",
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
