// url=<FIGMA_FILE_ID>?node-id=35415%3A1022
// source=https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/ControlButton/ControlButton.tsx
// component=ControlButton

import figma from 'figma';
import { getInstance } from '../../../figma/helpers';

const instance = getInstance();

const isSubtle = instance.getEnum('Color', { Basic: false, Subtle: true });
const size = instance.getEnum('Size', {
  XSmall: 'xsmall',
  Small: 'small',
  Medium: undefined,
  Large: 'large',
  XLarge: 'xlarge',
});

const icon = instance.findInstance('Icons/Close');
let iconCode;
if (icon && icon.type === 'INSTANCE') {
  iconCode = icon.executeTemplate().example;
}

export default {
  id: 'ControlButton',
  imports: ["import { ControlButton, Icon } from '@alma-oss/spirit-web-react';"],
  example: figma.code`
    <ControlButton
      isSymmetrical
      ${isSubtle ? figma.code` isSubtle` : ''}
      ${size ? figma.code` size="${size}"` : ''}
      aria-label="Close"
    >
      ${iconCode}
    </ControlButton>`,
};
