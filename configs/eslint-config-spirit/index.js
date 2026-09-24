import { fixupConfigRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import jestFormatting from 'eslint-plugin-jest-formatting';
import storybook from 'eslint-plugin-storybook';
import globals from 'globals';

const compat = new FlatCompat({ baseDirectory: import.meta.dirname });

const legacyReactAndJestConfig = compat.extends(
  '@lmc-eu/eslint-config-react/base',
  '@lmc-eu/eslint-config-react/optional',
  '@lmc-eu/eslint-config-jest',
);

export default [

  /**
   * Enable `react-refresh` after this config is migrated to flat
   *
   * Disabled in:
   *
   * @see { @link https://github.com/alma-oss/spirit-design-system/pull/2421 }
   */
  ...fixupConfigRules(legacyReactAndJestConfig),

  ...storybook.configs['flat/recommended'],

  {
    // `eslint-import-resolver-node` (the default) can't follow packages whose `package.json`
    // only declares an `exports` map (e.g. `eslint-plugin-storybook`, `@storybook/mcp`, and
    // this monorepo's own workspace packages), so it wrongly reports them as unresolved.
    // `eslint-import-resolver-typescript` understands `exports` maps and TS path mapping,
    // and we explicitly point it at the repo's TypeScript projects to keep workspace
    // packages resolvable when linting from the repository root.
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.mjs', '.cjs', '.jsx', '.ts', '.tsx'],
        },
        typescript: {
          alwaysTryTypes: true,
          project: [
            './tsconfig.json',
            './apps/*/tsconfig.json',
            './packages/*/tsconfig.json',
            './configs/*/tsconfig.json',
            './examples/*/tsconfig.json',
            './exporters/*/tsconfig.json',
          ],
        },
      },
    },
  },
  {
    languageOptions: {
      ecmaVersion: 'latest',
      globals: { ...globals.browser, ...globals.node },
    },

    rules: {

      /**
       * Set sorting of imports
       *
       * @see { @link https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/order.md }
       */
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          pathGroups: [
            {
              pattern: '**',
              group: 'internal',
            },
            {
              pattern: '..',
              group: 'parent',
              position: 'after',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          'newlines-between': 'never',
        },
      ],

      /**
       * Allow reassignment of params in properties
       *
       * @see { @link https://eslint.org/docs/latest/rules/no-param-reassign }
       */
      'no-param-reassign': ['warn', { props: false }],

      /**
       * Allow `++`/`--` in for loops
       *
       * @see { @link https://eslint.org/docs/rules/no-plusplus }
       */
      'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],

      /**
       * Warn when not using single quotes
       *
       * @see { @link https://eslint.org/docs/latest/rules/quotes }
       */
      quotes: ['warn', 'single'],
    },
  },

  {
    // Allow @jest-config-loader tag in jest.config.ts files
    // This is a special Jest directive for specifying the TypeScript loader
    // @see https://jestjs.io/docs/configuration
    files: ['**/jest.config.ts'],
    rules: {
      'jsdoc/check-tag-names': 'off',
    },
  },

  {
    // Registered under a spirit-namespaced key to avoid "Cannot redefine plugin" collisions
    // with whatever copy of `eslint-plugin-jest-formatting` `@lmc-eu/eslint-config-jest`
    // resolves internally (and to not depend on its overrides matching these file globs).
    files: ['test/**', 'tests/**', '**/*.test.*', '**/*.spec.*'],
    plugins: {
      'spirit-jest-formatting': jestFormatting,
    },
    rules: {
      // Require an empty line before the first `expect` in a group
      // @see { @link https://github.com/dangreenisrael/eslint-plugin-jest-formatting }
      'spirit-jest-formatting/padding-around-expect-groups': 'error',
    },
  },
];
