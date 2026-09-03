import { fixupConfigRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

export default [
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/.build/**',
      '**/.coverage/**',
      '!.*.js',
      '!*.config.js',
      '**/*.json',
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
    files: ['**/*.{js,mjs,cjs,ts,tsx,mts,cts}'],
    rules: {
      'arrow-body-style': 'off',
      'no-await-in-loop': 'off',
      'no-continue': 'off',
      'max-classes-per-file': 'off',
      quotes: ['warn', 'single', { avoidEscape: true }],
      'operator-linebreak': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
  {
    files: ['src/cli.ts', 'src/bin/**/*.js', '__tests__/**/*.ts'],
    rules: {
      'no-console': 'off',
    },
  },
];
