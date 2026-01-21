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

      // # Highly recommended to re-include JavaScript dotfiles to lint them
      // # (This will cause .*rc.js to be linted by ESLint 🤘)
      '!.*.js',

      // # Some tools use this pattern for their configuration files. Lint them!
      '!*.config.js',

      // Exclude JSON files from being linted
      // @TODO: use `eslint-plugin-jsonc` to lint JSON files properly
      '**/*.json',
    ],
  },
  ...fixupConfigRules(
    compat.extends(
      'eslint-config-spirit',
      '@lmc-eu/eslint-config-react',
      '@lmc-eu/eslint-config-typescript',
      '@lmc-eu/eslint-config-typescript/react',
      'eslint-config-spirit/prettier',
    ),
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
      // JSDoc is not able to resolve types from TypeScript files
      // @see { @link https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/no-undefined-types.md }
      'jsdoc/no-undefined-types': 'off',

      // We are using default values
      // @see { @link https://react.dev/learn/passing-props-to-a-component#specifying-a-default-value-for-a-prop React default values }
      // @see { @link https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/require-default-props.md }
      'react/require-default-props': 'off',

      // @see: { @link https://github.com/ArnaudBarre/eslint-plugin-react-refresh }
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      // we like to use props spreading for additional props in this case
      'react/jsx-props-no-spreading': 'off', // Used inside HOC, that is fine.

      // prefer arrow function over function expression
      'react/function-component-definition': [
        'warn',
        { namedComponents: 'arrow-function', unnamedComponents: 'arrow-function' },
      ],
      // we have missing displayName attribute in our components
      // it is good for debugging
      // @see: { @link https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/display-name.md }
      'react/display-name': 'off',

      /* start: allow UNSTABLE_ and UNSAFE_ prefix in component and prop names */
      // @see: { @link https://github.com/alma-oss/spirit-design-system/blob/main/docs/decisions/006-experimental-code.md }

      // enforce PascalCase for user-defined JSX components
      // @see: { @link https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-pascal-case.md }
      'react/jsx-pascal-case': [
        'error',
        {
          allowAllCaps: true,
          ignore: ['UNSTABLE_*'],
        },
      ],

      // enforce camelcase naming conventions
      // @see: { @link https://eslint.org/docs/latest/rules/camelcase ]
      camelcase: [
        'error',
        {
          properties: 'never',
          ignoreDestructuring: false,
          allow: ['^UNSAFE_', '^UNSTABLE_'],
        },
      ],
      /* end: allow UNSTABLE_ and UNSAFE_ prefix in component and prop names */

      // support monorepos
      'import/no-extraneous-dependencies': [
        'error',
        {
          packageDir: ['./', '../../'],
          peerDependencies: true,
        },
      ],

      // use useIsomorphicLayoutEffect instead of useLayoutEffect
      // @see: { @link https://medium.com/@alexandereardon/uselayouteffect-and-ssr-192986cdcf7a }
      'no-restricted-imports': [
        'error',
        // Disabling using of useLayoutEffect from react
        {
          name: 'react',
          importNames: ['useLayoutEffect'],
          message: '`useLayoutEffect` causes a warning in SSR. Use `useIsomorphicLayoutEffect`',
        },
      ],

      // allow empty interfaces with single extends (e.g. interface Foo extends SpiritBar {})
      // interface which extends some other interface is not considered as meaningful interface
      // we need this for meeting our component API conventions
      // @see: { @link https://typescript-eslint.io/rules/no-empty-interface/ }
      '@typescript-eslint/no-empty-interface': ['error', { allowSingleExtends: true }],

      // enforce consistent type imports
      // @see: { @link https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/consistent-type-imports.md }
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { fixStyle: 'inline-type-imports', prefer: 'type-imports' },
      ],

      // sort imports
      // @see: { @link https://eslint.org/docs/latest/rules/sort-imports }
      'sort-imports': [
        'error',
        {
          ignoreDeclarationSort: true,
        },
      ],

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
              pattern: 'react',
              group: 'external',
              position: 'before',
            },
            {
              pattern: '@testing-library/**',
              group: 'external',
              position: 'before',
            },
            {
              pattern: '@local/**',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '..',
              group: 'parent',
              position: 'after',
            },
            {
              pattern: '**',
              group: 'external',
            },
            {
              pattern: '@**',
              group: 'external',
            },
          ],
          pathGroupsExcludedImportTypes: ['external'],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          'newlines-between': 'never',
        },
      ],
    },
  },
  {
    // Stories are build by `apps/storybook` and have dependencies elsewhere
    files: ['**/stories/**'],
    rules: {
      'import/no-extraneous-dependencies': 'off',
      'jsx-a11y/anchor-is-valid': 'off',
    },
  },
  {
    // In demo files we want to use console and alert
    files: ['**/demo/**'],
    rules: {
      'jsx-a11y/anchor-is-valid': 'off',
      'no-console': 'off',
      'no-alert': 'off',
    },
  },
  {
    files: ['scripts/**', 'config/**'],
    rules: {
      '@typescript-eslint/no-var-requires': 'off',
    },
  },
  {
    files: ['tests/**/*.{ts,tsx}'],
    rules: {
      // Allow generically typed helpers in tests to accept any component factory.
      // @see: { @link https://typescript-eslint.io/rules/no-explicit-any }
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  {
    files: ['**/*.figma.*'],
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  },
  {
    // Allow underscore dangle for components exported with forwardRef in src/components
    files: ['src/components/**/*.{ts,tsx}'],
    rules: {
      'no-underscore-dangle': 'off',
    },
  },
];
