import { fixupConfigRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import spiritConfig from 'eslint-config-spirit';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

export default [
  {
    // # .eslintignore
    ignores: [
      // # NOTE:
      // # The following directives are only relevant when linting the whole
      // # project directory, ie. running `eslint .` ⚠️
      // # If you compile JavaScript into some output folder, exclude it here

      // Generated files or folders
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/.nx/**',
      '**/.yarn/**',
      // Ignore the playwright-report directory
      '**/playwright-report/**',
      '**/test-results/**',

      // Internal output folders
      'static',

      // No JSON-aware parser is configured, so JSON/JSONC files (including tsconfig.json,
      // which allows comments) fail to parse as plain JS. Nothing here lints JSON on purpose.
      // @see { @link https://github.com/lmc-eu/code-quality-tools/issues/270 }
      '**/*.json',

      // Skip packages that don’t need linting from root
      'apps/docsite',
      'examples/*',
      'exporters/assets',
      'exporters/js',
      'exporters/scss',
      'exporters/tokens',
      'packages/analytics',
      'packages/codemods',
      'packages/common',
      'packages/design-tokens',
      'packages/web',
      'packages/web-react',
      'scripts',

      // # Highly recommended to re-include JavaScript dotfiles to lint them
      // # (This will cause .eslintrc.js to be linted by ESLint 🤘)
      '!.*.js',

      // # Some tools use this pattern for their configuration files. Lint them!
      '!*.config.js',
    ],
  },
  ...spiritConfig,
  ...fixupConfigRules(compat.extends('eslint-config-spirit/style', 'eslint-config-spirit/prettier')),

  {
    // Standalone Node CLI scripts print to stdout/stderr by design.
    files: ['.agents/skills/**/scripts/**'],
    rules: {
      'no-console': 'off',
    },
  },

  {
    // These packages are plain Node ESM with no build/bundle step, so relative imports
    // must keep explicit extensions to resolve at runtime.
    files: ['configs/*/**'],
    rules: {
      'import/extensions': ['error', 'ignorePackages'],
    },
  },

  {
    // Everything linted from the repo root (per the ignores above) is tooling: build/lint/test
    // config, Storybook's own app, the demo app's Vite config, ambient type declarations. None
    // of it ships to consumers, so devDependencies are the correct place for its imports. This
    // extends airbnb's default `import/no-extraneous-dependencies` allowlist (see
    // `--print-config`) with the patterns it doesn't already cover.
    // @see { @link https://github.com/lmc-eu/code-quality-tools/issues/271 }
    rules: {
      'import/no-extraneous-dependencies': ['error', {
        devDependencies: [
          'config/**',
          'test/**',
          'tests/**',
          'spec/**',
          'scripts/*',
          '**/scripts/**',
          '**/__tests__/**',
          '**/__mocks__/**',
          'test.{js,jsx,ts,tsx}',
          'test-*.{js,jsx,ts,tsx}',
          '**/*{.,_}{test,spec}.{js,jsx,ts,tsx}',
          '**/jest.setup.{,m,c}{j,t}s',
          '**/vitest.setup.{,m,c}{j,t}s',
          '**/gulpfile.{,m,c}{j,t}s',
          '**/gulpfile.*.{,m,c}{j,t}s',
          '**/Gruntfile{,.js}',
          '**/.eslintrc.{,m,c}js',
          '**/.prettierrc.{,m,c}js',
          '**/.commitlintrc.{,m,c}js',
          '**/.remarkrc.{,m,c}js',
          '**/*.config.{,m,c}{j,t}s',
          '**/*.config.*.{,m,c}{j,t}s',
          '**/*.conf.{,m,c}{j,t}s',
          '**/*.conf.*.{,m,c}{j,t}s',
          '**/*.d.ts',
          'apps/storybook/**',
          'apps/demo/**',
        ],
        optionalDependencies: false,
      }],
    },
  },
];
