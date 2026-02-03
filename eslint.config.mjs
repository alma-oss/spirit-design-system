import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import importPlugin from 'eslint-plugin-import';

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

      // Skip packages that don’t need linting from root
      'examples/*',
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
  {
    // @TODO: remove `files` and `plugins` when all configs are flat
    files: ['**/*.{js,mjs,cjs}'],
    plugins: {
      import: fixupPluginRules(importPlugin),
    },
    ...fixupConfigRules(compat.extends('eslint-config-spirit', 'eslint-config-spirit/style'))[0],
  },
];
