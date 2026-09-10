/** @jest-config-loader ts-node */

const config = {
  preset: 'jest-config-spirit/node',
  coveragePathIgnorePatterns: [
    '<rootDir>/dist/',
    '<rootDir>/dist-ci/',
    '<rootDir>/node_modules/',
    'bin',
    '__fixtures__',
    'syncCli.ts',
  ],
  moduleNameMapper: {
    '^octokit$': '<rootDir>/src/__fixtures__/octokit.ts',
  },
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
    },
  },
};

export default config;
