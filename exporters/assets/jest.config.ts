/** @jest-config-loader ts-node */

const config = {
  preset: 'jest-config-spirit/node',
  coveragePathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/node_modules/', 'bin'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
    },
  },
};

export default config;
