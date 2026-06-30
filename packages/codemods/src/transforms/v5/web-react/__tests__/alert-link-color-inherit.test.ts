import { testTransform } from '../../../../../tests/testUtils';

testTransform(__dirname, 'alert-link-color-inherit');
testTransform(
  __dirname,
  'alert-link-color-inherit',
  { importSources: '@org/design-system' },
  'alert-link-color-inherit.import-sources',
);
