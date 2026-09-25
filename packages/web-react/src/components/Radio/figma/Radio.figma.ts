// url=<FIGMA_FILE_ID>?node-id=830%3A1204
// source=https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Radio/Radio.tsx
// component=Radio

import figma from 'figma';
import { getInstance } from '../../../figma/helpers';

const instance = getInstance();

const labelText = instance.getString('Label text');
const isChecked = instance.getEnum('Selected', { False: false, True: true });
const isDisabled = instance.getEnum('Disabled', { False: false, True: true });
const validationState = instance.getEnum('Validation State', {
  None: undefined,
  Success: 'success',
  Warning: 'warning',
  Danger: 'danger',
});

const showHelper = instance.getBoolean('Helper');
const getHelperMessage = () => {
  if (!showHelper) {
    return undefined;
  }
  const helperText = instance.findText('Helper text', { traverseInstances: true });

  return helperText.type !== 'ERROR' ? helperText.textContent : undefined;
};
const helperMessage = getHelperMessage();

export default {
  id: 'Radio',
  imports: ["import { Radio } from '@alma-oss/spirit-web-react';"],
  example: figma.code`
    <Radio
      id="radio-default"
      label="${labelText}"
      ${isChecked ? 'isChecked' : ''}
      ${isDisabled ? 'isDisabled' : ''}
      ${validationState ? figma.code`validationState="${validationState}"` : ''}
      ${helperMessage ? figma.code`helperText="${helperMessage}"` : ''}
    />`,
};
