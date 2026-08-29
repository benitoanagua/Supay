import type { StorybookConfig } from '@storybook/html-vite';
import { mergeConfig } from 'vite';
import path from 'node:path';

const config: StorybookConfig = {
  stories: [
    '../src/**/*.stories.@(ts|js)',
    '../../../packages/components/src/elements/**/*.stories.@(ts|js)',
  ],
  addons: ['@storybook/addon-essentials', '@storybook/addon-a11y', '@storybook/addon-viewport'],
  framework: { name: '@storybook/html-vite', options: {} },
  viteFinal: async (config) => mergeConfig(config, {
    resolve: {
      alias: {
        '@strata/components': path.resolve(__dirname, '../../../packages/components/src/main.ts'),
        '@strata/tokens': path.resolve(__dirname, '../../../packages/tokens/src/index.ts'),
      },
    },
  }),
};

export default config;
