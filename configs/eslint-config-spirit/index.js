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
  plugins: ['promise', 'react', '@typescript-eslint', /* 'react-refresh' */],

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
};
