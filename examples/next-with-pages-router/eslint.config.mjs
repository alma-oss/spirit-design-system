import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';

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
      // @see: https://github.com/alma-oss/spirit-design-system/issues/2243
      '**/*.json',
    ],
  },
  ...fixupConfigRules(
    compat.extends(
      'eslint-config-spirit',
      '@lmc-eu/eslint-config-react',
      '@lmc-eu/eslint-config-typescript',
      '@lmc-eu/eslint-config-typescript/react',
      '@lmc-eu/eslint-config-jest',
      'plugin:@next/next/recommended',
      'eslint-config-spirit/prettier',
    ),
  ),
  {
    plugins: {
      'react-refresh': fixupPluginRules(reactRefresh),
    },

    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        project: './tsconfig.eslint.json',
      },
      // @TODO: move this to `@lmc-eu/eslint-config-jest`
      globals: {
        ...globals.jest,
      },
    },
    // @TODO: remove `files` and `plugins` when all configs are flat
    files: ['**/*.{js,mjs,cjs,ts,tsx,mts,cts}'],

    rules: {
      // @see: https://github.com/ArnaudBarre/eslint-plugin-react-refresh
      'react-refresh/only-export-components': 'warn',
      // we like to use props spreading for additional props in this case
      'react/jsx-props-no-spreading': 'off', // Used inside HOC, that is fine.
      // prefer arrow function over function expression
      'react/function-component-definition': [
        'warn',
        { namedComponents: 'arrow-function', unnamedComponents: 'arrow-function' },
      ],
      // we have missing displayName attribute in our components
      // it is good for debugging
      // @see: https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/display-name.md
      'react/display-name': 'off',
      // ignore UNSTABLE_ prefix in component names
      'react/jsx-pascal-case': [
        'error',
        {
          allowAllCaps: true,
          ignore: ['UNSTABLE_*'],
        },
      ],
      // ignore UNSAFE and UNSTABLE_ prefixes
      camelcase: [
        'error',
        {
          properties: 'never',
          ignoreDestructuring: false,
          allow: ['^UNSAFE_', '^UNSTABLE_'],
        },
      ],
      // allow ++ in for loops
      'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
      // allow reassign in properties
      'no-param-reassign': ['warn', { props: false }],
      // support monorepos
      'import/no-extraneous-dependencies': [
        'error',
        {
          packageDir: ['./', '../../'],
          peerDependencies: true,
        },
      ],
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
      // disable double quotes
      quotes: ['warn', 'single'],
      // use useIsomorphicLayoutEffect instead of useLayoutEffect
      // @see: https://medium.com/@alexandereardon/uselayouteffect-and-ssr-192986cdcf7a
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
      // @see: https://typescript-eslint.io/rules/no-empty-interface/
      '@typescript-eslint/no-empty-interface': ['error', { allowSingleExtends: true }],
      'react/react-in-jsx-scope': 'off',
    },
  },
  {
    files: ['next-env.d.ts'],
    rules: {
      // File generated by Next.js, we don't want to lint it
      // @see: https://typescript-eslint.io/rules/triple-slash-reference/
      '@typescript-eslint/triple-slash-reference': 'off',
    },
  },
];
