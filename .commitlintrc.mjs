import conventionalConfig from '@alma-oss/commitlint-config';

export default {
  extends: ['@alma-oss/commitlint-config'],
  ignores: [
    ...conventionalConfig.ignores,
    (commit) => commit.includes('Updated styles and tokens'),
  ],
  rules: {
    'scope-enum': [
      1,
      'always',
      [
        // Use when committing changes/additions/removals to exact package
        'analytics',
        'codemods',
        'common',
        'design-tokens',
        'icons',
        'web',
        'web-react',
        // Use when committing changes/additions/removals to exact exporter
        'exporter-assets',
        'exporter-tokens',
        // Use when committing changes/additions/removals to exact config
        'eslint-config',
        'jest-config',
        'prettier-config',
        'stylelint-config',
        'typescript-config',
        // Use when affecting the scripts
        'scripts',
        // Use when affecting CI process
        'ci',
        // Use for anything that does not directly affect packages, ie. updating repo-wide
        'repo',
        // Use for changes in support applications like `demo`
        'demo',
        'docsite',
      ],
    ],
  },
};
