import { fixupConfigRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import spiritConfig from 'eslint-config-spirit';
import spiritConfigPrettier from 'eslint-config-spirit/prettier';

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
      '**/.coverage/**',
      '**/*.input.tsx',
      '**/*.output.tsx',

      // # Highly recommended to re-include JavaScript dotfiles to lint them
      // # (This will cause .eslintrc.js to be linted by ESLint 🤘)
      '!.*.js',

      // # Some tools use this pattern for their configuration files. Lint them!
      '!*.config.js',

      // Exclude JSON files from being linted
      // @TODO: use `eslint-plugin-jsonc` to lint JSON files properly
      '**/*.json',
    ],
  },
  ...spiritConfig,
  ...fixupConfigRules(compat.extends('@lmc-eu/eslint-config-typescript')),
  ...spiritConfigPrettier,
  {
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        project: './config/tsconfig.eslint.json',
      },
    },
    // @TODO: remove `files` and `plugins` when all configs are flat
    files: ['**/*.{js,mjs,cjs,ts,tsx,mts,cts}'],
  },
];
