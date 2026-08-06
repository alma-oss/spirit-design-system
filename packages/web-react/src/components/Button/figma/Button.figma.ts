// url=<FIGMA_FILE_ID>?node-id=776%3A20
// source=https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Button/Button.tsx
// component=Button

import figma from 'figma';
import { getInstance } from '../../../figma/helpers';

const instance = getInstance();

const content = instance.getPropertyValue('Content');
const color = instance.getEnum('Color', {
  Primary: undefined,
  Secondary: 'secondary',
  Tertiary: 'tertiary',
  Success: 'success',
  Warning: 'warning',
  Danger: 'danger',
  Informative: 'informative',
  Plain: 'plain',
});
const size = instance.getEnum('Size', {
  Large: 'large',
  Medium: undefined,
  Small: 'small',
});
const isDisabled = instance.getEnum('Disabled', { False: false, True: true });
const isLoading = instance.getEnum('Loading', { False: false, True: true });
const labelText = instance.getString('Label Text');

const iconInstance = instance.getInstanceSwap('Icon');
let iconCode;
if (iconInstance && iconInstance.type === 'INSTANCE') {
  iconCode = iconInstance.executeTemplate().example;
}

let example;
if (content === 'Text-and-icon') {
  example = figma.code`
    <Button
      ${color ? figma.code` color="${color}"` : ''}
      ${size ? figma.code` size="${size}"` : ''}
      ${isDisabled ? figma.code` isDisabled` : ''}
      ${isLoading ? figma.code` isLoading` : ''}
    >
      ${iconCode}
      ${labelText}
    </Button>`;
} else if (content === 'Icon') {
  example = figma.code`
    <Button
      isSymmetrical
      ${color ? figma.code` color="${color}"` : ''}
      ${size ? figma.code` size="${size}"` : ''}
      ${isDisabled ? figma.code` isDisabled` : ''}
      ${isLoading ? figma.code` isLoading` : ''}
    >
      ${iconCode}
    </Button>`;
} else {
  example = figma.code`
    <Button
      ${color ? figma.code` color="${color}"` : ''}
      ${size ? figma.code` size="${size}"` : ''}
      ${isDisabled ? figma.code` isDisabled` : ''}
      ${isLoading ? figma.code` isLoading` : ''}
    >
      ${labelText}
    </Button>`;
}

export default {
  id: 'Button',
  imports: ["import { Button } from '@alma-oss/spirit-web-react';"],
  example,
  metadata: { nestable: true },
};
