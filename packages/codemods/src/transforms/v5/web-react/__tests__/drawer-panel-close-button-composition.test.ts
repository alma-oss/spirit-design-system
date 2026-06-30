import { testTransform } from '../../../../../tests/testUtils';

testTransform(__dirname, 'drawer-panel-close-button-composition');
testTransform(
  __dirname,
  'drawer-panel-close-button-composition',
  { importSources: '@org/design-system' },
  'drawer-panel-close-button-composition.import-sources',
);
