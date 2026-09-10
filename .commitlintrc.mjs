import conventionalConfig from '@alma-oss/commitlint-config';

export default {
  extends: ['@alma-oss/commitlint-config'],
  ignores: [
    ...conventionalConfig.ignores,
    (commit) => commit.includes('Updated styles and tokens'),
  ],
  plugins: [
    {
      rules: {
        'issue-reference-format': ({ raw = '' }) => {
          const refs = raw.match(/#(?:[A-Za-z]+-\w+|\d+)(?!\w|-)/g) ?? [];
          const invalid = refs.filter((r) => !/^(?:#[A-Za-z]+-\d+|#\d+)$/.test(r));

          return [
            invalid.length === 0,
            `Issue reference must have a numeric suffix (e.g. #DS-1234, #UA-5678, #1234): ${invalid.join(', ')}`,
          ];
        },
      },
    },
  ],
  rules: {
    'issue-reference-format': [2, 'always'],
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
        'vite-plugin-spirit-icons',
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
