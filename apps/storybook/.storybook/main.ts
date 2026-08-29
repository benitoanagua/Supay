import type { StorybookConfig } from '@storybook/html-vite';
import { mergeConfig } from 'vite';
import path from 'node:path';

const config: StorybookConfig = {
  stories: [
    '../src/**/*.stories.@(ts|js)',
    '../../../packages/components/src/elements/**/*.stories.@(ts|js)',
  ],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-backgrounds',
    '@storybook/addon-controls',
    '@storybook/addon-docs',
    '@storybook/addon-toolbars',
    '@storybook/addon-viewport',
  ],
  framework: { name: '@storybook/html-vite', options: {} },
  viteFinal: async (config) => mergeConfig(config, {
    resolve: {
      alias: {
        '@strata/components': path.resolve(__dirname, '../../../packages/components/src/main.ts'),
      },
    },
  }),
};

export default config;
