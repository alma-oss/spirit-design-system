import { testTransform } from '../../../../../tests/testUtils';

testTransform(__dirname, 'close-buttons-to-close-button');
testTransform(
  __dirname,
  'close-buttons-to-close-button',
  { importSources: '@org/design-system' },
  'close-buttons-to-close-button.import-sources',
);
