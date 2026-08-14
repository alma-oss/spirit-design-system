import { testTransform } from '../../../../../tests/testUtils';

testTransform(__dirname, 'heading-text-emphasis-prop');
testTransform(
  __dirname,
  'heading-text-emphasis-prop',
  { importSources: '@org/design-system' },
  'heading-text-emphasis-prop.import-sources',
);
