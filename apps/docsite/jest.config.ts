/** @jest-config-loader ts-node */

const config = {
  preset: 'jest-config-spirit',
  moduleNameMapper: {
    '^@local/(.*)': '<rootDir>/src/$1',
  },
};

export default config;
