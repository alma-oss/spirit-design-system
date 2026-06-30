import { testTransform } from '../../../../../tests/testUtils';

testTransform(__dirname, 'validation-state-icon-prop');
testTransform(
  __dirname,
  'validation-state-icon-prop',
  { importSources: '@org/design-system' },
  'validation-state-icon-prop.import-sources',
);
