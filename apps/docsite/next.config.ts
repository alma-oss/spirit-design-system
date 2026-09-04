import { dirname, resolve, join } from 'path';
import { fileURLToPath } from 'url';
import createMDX from '@next/mdx';
import type { NextConfig } from 'next';

const pathDir = dirname(fileURLToPath(import.meta.url));

// Turbopack requires JSON-serializable loader options, so plugins must be string references.
// @next/mdx/mdx-js-loader's importPlugin() resolves string names via dynamic import at runtime,
// before passing to unified — which is why unified's Pluggable type doesn't include strings.
type JsonValue = string | number | boolean | JsonValue[] | { [key: string]: JsonValue };
type StringPluginTuple = [pluginName: string, ...options: JsonValue[]];

const rehypePrettyCodeOptions = {
  theme: 'tokyo-night',
};

const mdxPluginOptions: { remarkPlugins: StringPluginTuple[]; rehypePlugins: StringPluginTuple[] } = {
  remarkPlugins: [['remark-gfm']],
  rehypePlugins: [['rehype-pretty-code', rehypePrettyCodeOptions]],
};

const nextConfig: NextConfig = {
  outputFileTracingRoot: join(__dirname, '../../'),
  // The sprite route and the Web Preview tab read packages/web files via runtime `fs` calls,
  // which output file tracing can't detect statically — include them explicitly so they ship
  // with the built app instead of 404ing/erroring in production.
  outputFileTracingIncludes: {
    '/assets/icons/svg/sprite.svg': ['../../packages/web/public/icons/svg/sprite.svg'],
    '/components/[component]/web-preview': [
      '../../packages/web/src/scss/components/**/preview.html',
      // Path is hardcoded in compilePreview.ts as `PARTIALS_DIR` — update both if this moves.
      './src/domains/components/ui/partials/**/*',
    ],
  },
  transpilePackages: ['@alma-oss/spirit-web-react'],
  reactStrictMode: true,
  experimental: {
    globalNotFound: true,
  },
  sassOptions: {
    fiber: false,
    implementation: 'sass-embedded',
    quietDeps: true,
    loadPaths: [
      join(pathDir, '../../node_modules'),
      join(pathDir, '../../node_modules/@alma-oss/spirit-design-tokens/scss'),
    ],
  },
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  // @next/mdx only registers *.mdx in Turbopack rules; add *.md explicitly so
  // dynamic imports of README.md files from packages are handled by the same loader.
  turbopack: {
    rules: {
      '*.md': {
        loaders: [
          {
            loader: '@next/mdx/mdx-js-loader',
            options: {
              providerImportSource: 'next-mdx-import-source-file',
              ...mdxPluginOptions,
            },
          },
        ],
        as: '*.tsx',
      },
    },
  },
  webpack: (config) => {
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve?.alias,
        '@local': resolve(__dirname, './src'),
      },
    };

    return config;
  },
};

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  // @next/mdx accepts string plugin names at runtime via importPlugin() but its types require
  // unified's Pluggable (function references). Cast at the boundary to bridge this gap.
  options: mdxPluginOptions as unknown as NonNullable<Parameters<typeof createMDX>[0]>['options'],
});

export default withMDX(nextConfig);
