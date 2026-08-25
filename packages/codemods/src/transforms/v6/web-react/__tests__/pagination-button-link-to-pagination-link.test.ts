import { testTransform } from '../../../../../tests/testUtils';

testTransform(__dirname, 'pagination-button-link-to-pagination-link');
testTransform(
  __dirname,
  'pagination-button-link-to-pagination-link',
  { importSources: '@org/design-system' },
  'pagination-button-link-to-pagination-link.import-sources',
);
