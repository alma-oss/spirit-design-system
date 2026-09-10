/** @jest-config-loader ts-node */

const config = {
  preset: 'jest-config-spirit/node',
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
};

export default config;
