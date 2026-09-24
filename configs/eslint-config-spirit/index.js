import { fixupConfigRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import jest from 'eslint-plugin-jest';
import jestFormatting from 'eslint-plugin-jest-formatting';
import storybook from 'eslint-plugin-storybook';
import globals from 'globals';

const compat = new FlatCompat({ baseDirectory: import.meta.dirname });

const testFileGlobs = ['test/**', 'tests/**', '**/*.test.*', '**/*.spec.*'];

// Narrower than `testFileGlobs`: excludes bare `tests/**`, which also matches shared test
// helpers (e.g. `tests/providerTests/spacingPropsTest.tsx`) that legitimately `export`
// reusable test factories and would trip `jest/no-export` if the full jest ruleset applied.
// Those helpers still need jest globals (see below), just not the plugin's own rules.
const jestRuleFileGlobs = ['test/**', '**/*.test.*', '**/*.spec.*', 'config/jest/**'];

const legacyReactConfig = compat.extends(
  '@lmc-eu/eslint-config-react/base',
  '@lmc-eu/eslint-config-react/optional',
);

// `@lmc-eu/eslint-config-typescript` only declares its file-specific tweaks (`*.d.ts`,
// config files) via `overrides`, which `FlatCompat` cannot translate correctly when the
// override itself uses `extends` (see the jest config below for the same limitation) —
// it silently produces `files: [null]`, a pattern that never matches. Drop those broken
// entries and scope the rest (parser, plugin, base rules) to TypeScript files ourselves.
const legacyTypescriptConfig = fixupConfigRules(compat.extends('@lmc-eu/eslint-config-typescript'))
  // Drop `settings` here — it must apply to every file (JS imports resolve TS modules too),
  // not just the TS-file-scoped block below. It's re-added, unscoped, further down.
  .filter((config) => !config.files && !config.settings)
  .map((config) => ({ ...config, files: ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts'] }));

export default [

  /**
   * Enable `react-refresh` after this config is migrated to flat
   *
   * Disabled in:
   *
   * @see { @link https://github.com/alma-oss/spirit-design-system/pull/2421 }
   */
  ...fixupConfigRules(legacyReactConfig),

  ...legacyTypescriptConfig,

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

  // `@lmc-eu/eslint-config-jest` only exposes its settings via a single `overrides` entry
  // that itself uses `extends`, which `FlatCompat` cannot translate (same limitation as
  // the TypeScript config above) — every resulting entry gets `files: [null]` and never
  // applies. Configure the jest plugin and globals natively instead, scoped to test files.
  {
    files: testFileGlobs,
    languageOptions: {
      globals: jest.environments.globals.globals,
    },
  },

  {
    // Registered under a spirit-namespaced key to avoid "Cannot redefine plugin" collisions
    // with whatever copy of `eslint-plugin-jest` a consumer resolves internally via its own
    // `compat.extends('@lmc-eu/eslint-config-jest')` (same rationale as `spirit-jest-formatting`
    // below) — flat config treats two different module instances under the same key as a clash.
    files: jestRuleFileGlobs,
    plugins: { 'spirit-jest': jest },
    rules: Object.fromEntries(
      Object.entries({ ...jest.configs['flat/recommended'].rules, ...jest.configs['flat/style'].rules })
        .map(([rule, severity]) => [rule.replace(/^jest\//, 'spirit-jest/'), severity]),
    ),
  },

  {
    // Custom jest matchers/setup code (e.g. `expect.extend(...)`) runs in the jest
    // environment but isn't itself a `*.test.*`/`*.spec.*` file, so it needs the jest
    // globals without the test-file-specific plugin rules above.
    files: ['configs/jest-config-spirit/**'],
    languageOptions: {
      globals: jest.environments.globals.globals,
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
