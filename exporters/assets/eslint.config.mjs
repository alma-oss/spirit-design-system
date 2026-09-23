import { fixupConfigRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import spiritConfig from 'eslint-config-spirit';
import spiritPrettier from 'eslint-config-spirit/prettier';

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
  ...spiritConfig,
  ...fixupConfigRules(
    compat.extends('@lmc-eu/eslint-config-typescript', '@lmc-eu/eslint-config-jest'),
  ),
  ...spiritPrettier,
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
    files: ['src/cli.ts', 'src/cli/**/*.ts', 'src/syncCli.ts', 'src/bin/**/*.js', 'src/**/__tests__/**/*.ts'],
    rules: {
      'no-console': 'off',
    },
  },
];
