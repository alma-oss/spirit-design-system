// eslint-disable-next-line @typescript-eslint/no-var-requires
const { defineTest } = require('jscodeshift/dist/testUtils');

export const testTransform = (
  directory: string,
  name: string,
  options: Record<string, unknown> | null = null,
  fixtureName = name,
) => {
  defineTest(directory, name, options, fixtureName, {
    parser: 'tsx',
    fixture: 'input',
    snapshot: true,
  });
};
