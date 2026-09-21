import { testTransform } from '../../../../../tests/testUtils';

testTransform(__dirname, 'component-strings-prop');
testTransform(
  __dirname,
  'component-strings-prop',
  { importSources: '@org/design-system' },
  'component-strings-prop.import-sources',
);
