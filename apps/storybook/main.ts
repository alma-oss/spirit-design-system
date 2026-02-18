import type { StorybookConfig } from '@storybook/react-vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { mergeConfig } from 'vite';
import markdownRawPlugin from 'vite-raw-plugin';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const config: StorybookConfig = {
  stories: ['../../packages/**/*.mdx', '../../packages/**/*.stories.@(ts|tsx)'],

  addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],

  core: {
    disableTelemetry: true,
    crossOriginIsolated: false,
  },

  async viteFinal(config) {
    // Merge custom configuration into the default config
    return mergeConfig(config, {
      resolve: {
        alias: {
          '@alma-oss/spirit-design-tokens': resolve(__dirname, '../../packages/design-tokens/src/js'),
          '@alma-oss/spirit-icons': resolve(__dirname, '../../packages/icons/dist'),
        },
      },
      plugins: [
        markdownRawPlugin({
          fileRegex: /\.md$/,
        }),
        react({
          jsxRuntime: 'automatic',
        }),
      ],
      css: {
        postcss: resolve(__dirname, 'config'),
        preprocessorOptions: {
          scss: {
            api: 'modern-compiler',
            loadPaths: [
              resolve(__dirname, '../../node_modules'),
              resolve(__dirname, '../../node_modules/@alma-oss/spirit-design-tokens/src/scss'),
            ],
          },
        },
      },
    });
  },

  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  docs: {
    defaultName: 'Overview',
  },

  typescript: {
    reactDocgen: 'react-docgen',
  },
};

export default config;
