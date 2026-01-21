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
};

export default config;
