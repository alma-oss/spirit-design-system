/** @jest-config-loader ts-node */

const config = {
  preset: 'jest-config-spirit/node',
  coveragePathIgnorePatterns: [
    '<rootDir>/dist/',
    '<rootDir>/node_modules/',
    'bin',
    '__fixtures__',
    '__tests__',
    '\\.test\\.ts$',
  ],
};

export default config;
