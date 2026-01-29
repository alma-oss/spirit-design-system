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
      '**/.build/**',
      '**/generated/**',
      '**/.coverage/**',

      // # Highly recommended to re-include JavaScript dotfiles to lint them
      // # (This will cause .*rc.js to be linted by ESLint 🤘)
      '!.*.js',

      // # Some tools use this pattern for their configuration files. Lint them!
      '!*.config.js',

      // Exclude JSON files from being linted
      // @TODO: use `eslint-plugin-jsonc` to lint JSON files properly
      // @see: https://github.com/alma-oss/spirit-design-system/issues/2243
      '**/*.json',

      // Unformatted fixtures
      '**/{fixtures}/**/unformatted*',
      '**/__fixtures__/unformatted*',
    ],
  },
  ...fixupConfigRules(
    compat.extends(
      'eslint-config-spirit',
      '@lmc-eu/eslint-config-typescript',
      '@lmc-eu/eslint-config-jest',
      'eslint-config-spirit/prettier',
    ),
  ),
  {
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        project: './tsconfig.eslint.json',
      },
    },
    // @TODO: remove `files` and `plugins` when all configs are flat
    files: ['**/*.{js,mjs,cjs,ts,tsx,mts,cts}'],

    rules: {
      // Conflicting with the Prettier configuration for the line length
      // We are leaving this up to developer to decide where to use braces and where implicit return
      // @see { @link https://eslint.org/docs/latest/rules/arrow-body-style }
      'arrow-body-style': 'off',

      // Better handling quotes with escaped strings inside
      // Double and backticks quotes are allowed when needed
      // @see { @link https://eslint.org/docs/latest/rules/quotes }
      quotes: ['warn', 'single', { avoidEscape: true }],

      // Conflicting with the Prettier configuration
      // @see { @link https://eslint.org/docs/latest/rules/operator-linebreak }
      'operator-linebreak': 'off',

      // Allow specific types in JSDoc comments
      // @see { @link https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/no-undefined-types.md}
      'jsdoc/no-undefined-types': [
        'error',
        {
          definedTypes: ['Token', 'TokenTheme'],
        },
      ],

      // Allow reassigning properties of parameters
      // @see { @link https://eslint.org/docs/latest/rules/no-param-reassign}
      'no-param-reassign': [
        'error',
        {
          props: false,
        },
      ],
    },
  },
];
