// url=<FIGMA_FILE_ID>?node-id=49511%3A7619
// source=https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/ProgressBar/ProgressBar.tsx
// component=ProgressBar

import figma from 'figma';

const valuePlacement = figma.selectedInstance.getEnum('Value placement', {
  None: undefined,
  Right: undefined,
  Bottom: 'bottom',
});
const color = figma.selectedInstance.getEnum('Color', {
  Informative: undefined,
  'Accent 01': 'accent01',
  Danger: 'danger',
  Success: 'success',
  Warning: 'warning',
});
const isDisabled = figma.selectedInstance.getEnum('Disabled', { False: false, True: true });

const example = figma.code`
  <ProgressBar
    value={65}
    ${valuePlacement ? figma.code`valuePlacement="${valuePlacement}"` : ''}
    ${color ? figma.code`color="${color}"` : ''}
    ${isDisabled ? figma.code`isDisabled` : ''}
  />`;

export default {
  id: 'ProgressBar',
  imports: ["import { ProgressBar } from '@alma-oss/spirit-web-react';"],
  example,
};
