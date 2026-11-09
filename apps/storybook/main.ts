import { createRequire } from 'module';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { type StorybookConfig } from '@storybook/react-vite';
import react from '@vitejs/plugin-react';
import { mergeConfig } from 'vite';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const isProd = process.env.NODE_ENV === 'production';
// Exclude Figma Code Connect stories from Chromatic snapshots only (set in storybook-deployment.yaml)
const isChromatic = process.env.CHROMATIC === 'true';
// Story UI (Generative UI workspace) needs its own server and an API key, so it is enabled only
// by `yarn storybook:ui` (sets STORY_UI=true) and never in production builds.
// @see https://github.com/southleft/story-ui
const isStoryUiEnabled = !isProd && process.env.STORY_UI === 'true';
// The manager addon ships as TSX inside the package; locate it next to the exported workspace stylesheet
const storyUiManagerEntry = (): string =>
  resolve(dirname(createRequire(import.meta.url).resolve('@tpitre/story-ui/manager.css')), '../StoryUI/manager.tsx');

type SpiritStorybookConfig = StorybookConfig & {
  // `main.ts` is loaded as a preset, so it can contribute manager entries the same way addons do.
  // `StorybookConfig` does not type this preset property, hence the extension.
  managerEntries?: (entries?: string[]) => string[];
};

const config: SpiritStorybookConfig = {
  stories: [
    '../../packages/**/*.mdx',
    isChromatic
      ? '../../packages/**/!(*.figma).stories.@(ts|tsx)'
      : '../../packages/**/*.stories.@(ts|tsx)',
    ...isStoryUiEnabled ? ['./stories/generated/**/*.stories.@(ts|tsx)'] : [],
  ],

  // @see: https://storybook.js.org/docs/writing-stories/tags#custom-tags
  tags: {
    figma: {
      excludeFromSidebar: isProd,
      ...isProd && { defaultFilterSelection: 'exclude' as const },
    },
  },

  addons: ['@storybook/addon-docs', '@storybook/addon-a11y', '@storybook/addon-mcp'],

  // Story UI workspace page (`?path=/workspace/`) and its toolbar button
  managerEntries: (entries = []) =>
    isStoryUiEnabled ? [...entries, storyUiManagerEntry()] : entries,

  core: {
    disableTelemetry: true,
    crossOriginIsolated: false,
  },

  async viteFinal(viteConfig) {
    // Merge custom configuration into the default config
    return mergeConfig(viteConfig, {
      resolve: {
        conditions: ['development'],
        alias: {
          '@alma-oss/spirit-design-tokens': resolve(__dirname, '../../packages/design-tokens/src/js'),
        },
      },
      plugins: [
        react({
          jsxRuntime: 'automatic',
        }),
      ],
      ...isStoryUiEnabled && {
        optimizeDeps: {
          // Story UI ships its workspace with CSS imports, so it must not be pre-bundled.
          // Its CommonJS-only transitive dependency still has to be, otherwise the workspace fails to mount.
          exclude: ['@tpitre/story-ui'],
          include: ['@tpitre/story-ui > @radix-ui/themes > classnames'],
        },
      },
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
