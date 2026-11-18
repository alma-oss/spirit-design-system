// @ts-check

/**
 * Stryker mutation testing configuration.
 *
 * @see { @link https://stryker-mutator.io/docs/stryker-js/configuration/ }
 * @type {import('@stryker-mutator/api/core').PartialStrykerOptions}
 */
export default {
  testRunner: 'jest',
  jest: {
    configFile: 'jest.config.ts',
  },
  checkers: ['typescript'],
  tsconfigFile: 'tsconfig.json',
  mutate: ['src/**/*.ts', '!src/**/*.test.ts', '!src/**/index.ts'],
  coverageAnalysis: 'perTest',
  incremental: true,
  incrementalFile: 'reports/mutation/incremental.json',

  // The Jest preset resolves `@swc/jest` as `<rootDir>/../../node_modules`, so the sandbox must live
  // exactly two levels below the repository root (as `packages/common` does), not inside the package.
  tempDirName: '../../.stryker-tmp',
  reporters: ['clear-text', 'progress', 'html', 'json'],
  htmlReporter: { fileName: 'reports/mutation/index.html' },
  jsonReporter: { fileName: 'reports/mutation/mutation.json' },
  thresholds: { high: 80, low: 60, break: null },
};
