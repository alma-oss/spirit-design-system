import spiritConfig from 'eslint-config-spirit';
import spiritStyle from 'eslint-config-spirit/style';

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
  ...spiritStyle,
];
