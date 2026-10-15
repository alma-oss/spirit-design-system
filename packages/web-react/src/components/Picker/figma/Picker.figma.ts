// url=<FIGMA_FILE_ID>?node-id=42931%3A8174
// source=https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Picker/Picker.tsx
// component=Picker

import figma from 'figma';

const size = figma.selectedInstance.getEnum('Size', { Small: 'small', Medium: undefined, Large: 'large' });
const validationState = figma.selectedInstance.getEnum('Validation State', {
  None: undefined,
  Success: 'success',
  Warning: 'warning',
  Danger: 'danger',
});
const isDisabled = figma.selectedInstance.getEnum('Disabled', { False: false, True: true });

const example = figma.code`
  <Picker
    ${size ? figma.code`size="${size}"` : ''}
    ${validationState ? figma.code`validationState="${validationState}"` : ''}
    ${isDisabled ? figma.code`isDisabled` : ''}
  />`;

export default {
  id: 'Picker',
  imports: ["import { Picker } from '@alma-oss/spirit-web-react';"],
  example,
};
