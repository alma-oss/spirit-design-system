module.exports = {
  root: true,

  parserOptions: {
    ecmaVersion: 'latest',
  },

  env: {
    browser: true,
    node: true,
  },

  extends: [
    '@lmc-eu/eslint-config-react/base',
    '@lmc-eu/eslint-config-react/optional',
    '@lmc-eu/eslint-config-jest',
    'plugin:storybook/recommended',
  ],

  /**
   * Enable `react-refresh` after this config is migrated to flat
   *
   * Disabled in:
   * @see { @link https://github.com/alma-oss/spirit-design-system/pull/2421 }
   */
  plugins: ['jest-formatting', 'promise', 'react', '@typescript-eslint', /* 'react-refresh' */],

  settings: {
    // `eslint-import-resolver-node` (the default) can't follow packages whose `package.json`
    // only declares an `exports` map (e.g. this monorepo's own workspace packages), so it
    // wrongly reports them as unresolved. `eslint-import-resolver-typescript` understands
    // `exports` maps and TS path mapping, and we explicitly point it at the repo's TypeScript
    // projects to keep workspace packages resolvable when linting from the repository root.
    'import/resolver': {
      node: {
        extensions: ['.js', '.mjs', '.cjs', '.jsx', '.ts', '.tsx'],
      },
      typescript: {
        alwaysTryTypes: true,
        // Prefer each workspace package's `development` export condition (when present) over
        // `import`/`require`, which point at `dist`. `development` resolves straight to
        // TypeScript source, so linting from the repository root no longer requires building
        // workspace packages first. `types` is deliberately excluded here: Node's
        // conditional-exports resolution picks a branch by the condition's *declared order* in
        // the package's own `exports` map (not by this array's order), and every package using
        // `development` also declares `types` earlier — so keeping `types` in this set would
        // always shadow `development` and send resolution back to (missing) `dist` `.d.ts`
        // files. `alwaysTryTypes` above covers `@types/*` packages separately.
        conditionNames: ['development', 'import', 'require', 'node', 'default'],
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

  overrides: [
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
      files: ['test/**', 'tests/**', '**/*.test.*', '**/*.spec.*'],
      rules: {
        // Require an empty line before the first `expect` in a group
        // @see { @link https://github.com/dangreenisrael/eslint-plugin-jest-formatting }
        'jest-formatting/padding-around-expect-groups': 'error',
      },
    },
  ],
};
