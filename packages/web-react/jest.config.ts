/** @jest-config-loader ts-node */

const config = {
  preset: 'jest-config-spirit/jsdom',

  /**
   * @todo Move this configuration to the `jest-config-spirit` preset
   *
   * @see { @link https://github.com/alma-oss/spirit-design-system/issues/1413 }
   */
  // A list of paths to modules that run some code to configure or set up the testing framework before each test file in the suite is executed.
  // https://jestjs.io/docs/configuration#setupfilesafterenv-array
  setupFilesAfterEnv: ['<rootDir>/config/jest/setupTestingLibrary.ts'],

  // Automatically clear mock calls, instances, contexts and results before every test.
  // https://jestjs.io/docs/configuration#clearmocks-boolean
  clearMocks: true,

  // A map from regular expressions to module names or to arrays of module names
  // https://jestjs.io/docs/configuration#modulenamemapper-objectstring-string--arraystring
  moduleNameMapper: {
    '^@local/(.*)': '<rootDir>/$1',
    '^@local/tests/(.*)': '<rootDir>/tests/$1',
    '^@alma-oss/spirit-design-tokens': '<rootDir>/../design-tokens/src/js',
  },
};

export default config;
