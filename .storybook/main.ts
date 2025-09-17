import type { StorybookConfig } from "@storybook/html-vite";

const config: StorybookConfig = {
  stories: [
    "../src/stories/**/*.mdx",
    "../src/stories/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: ["@storybook/addon-essentials", "@storybook/addon-a11y"],
  framework: {
    name: "@storybook/html-vite",
    options: {},
  },
  staticDirs: ["../dist"],
  // Configura Vite para observar los archivos dist
  viteFinal: async (config) => {
    config.server = {
      ...config.server,
      watch: {
        ...config.server?.watch,
        ignored: ["!**/dist/**"], // No ignorar la carpeta dist
      },
    };
    return config;
  },
};

export default config;
