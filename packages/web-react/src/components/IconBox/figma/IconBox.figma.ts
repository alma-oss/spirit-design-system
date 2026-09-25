// url=<FIGMA_FILE_ID>?node-id=31902%3A1019
// source=https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/IconBox/IconBox.tsx
// component=IconBox

import figma from 'figma';
import { getInstance } from '../../../figma/helpers';

const instance = getInstance();

const color = instance.getEnum('Color', {
  'Accent 01': '01',
  'Accent 02': '02',
  Danger: 'danger',
  Informative: undefined,
  Success: 'success',
  Warning: 'warning',
});
const shape = instance.getEnum('Shape', {
  Square: 'square',
  Rounded: undefined,
  Circle: 'circle',
});
const isSubtle = instance.getEnum('Subtle', { False: false, True: undefined });
const size = instance.getEnum('Size', {
  XSmall: 'xsmall',
  Small: 'small',
  Medium: undefined,
  Large: 'large',
  XLarge: 'xlarge',
});

const icon = instance.getInstanceSwap('Icon');
let iconName;
if (icon && icon.type === 'INSTANCE') {
  iconName = icon.executeTemplate().metadata?.props?.iconName;
}

export default {
  id: 'IconBox',
  imports: ["import { IconBox } from '@alma-oss/spirit-web-react';"],
  example: figma.code`
    <IconBox
      iconName="${iconName}"
      ${color ? figma.code`color="${color}"` : ''}
      ${shape ? figma.code`shape="${shape}"` : ''}
      ${size ? figma.code`size="${size}"` : ''}
      ${isSubtle === false ? 'isSubtle={false}' : ''}
    />`,
};
