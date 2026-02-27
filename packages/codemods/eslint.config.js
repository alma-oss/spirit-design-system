import { fixupConfigRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';

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
  ...fixupConfigRules(
    compat.extends('eslint-config-spirit', '@lmc-eu/eslint-config-typescript', 'eslint-config-spirit/prettier'),
  ),
  {
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        project: './config/tsconfig.eslint.json',
      },
    },
    // @TODO: remove `files` and `plugins` when all configs are flat
    files: ['**/*.{js,mjs,cjs,ts,tsx,mts,cts}'],
    rules: {
      // Allow specific types in JSDoc comments
      // @see { @link https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/no-undefined-types.md}
      'jsdoc/no-undefined-types': [
        'error',
        {
          definedTypes: ['core', 'Collection'],
        },
      ],
    },
  },
  {
    // Allow property reassignment in transform and helper files
    // This is necessary for AST manipulation with jscodeshift
    files: ['src/transforms/**/*.ts', 'src/helpers/**/*.ts'],
    rules: {
      'no-param-reassign': ['error', { props: false }],
    },
  },
];
