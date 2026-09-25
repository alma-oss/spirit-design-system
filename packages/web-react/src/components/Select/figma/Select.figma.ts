// url=<FIGMA_FILE_ID>?node-id=10580%3A5547
// source=https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Select/Select.tsx
// component=Select

import figma from 'figma';
import { getInstance } from '../../../figma/helpers';

const instance = getInstance();

const variant = instance.getEnum('Variant', { Outline: undefined, Fill: 'fill' });
const size = instance.getEnum('Size', { Small: 'small', Medium: undefined, Large: 'large' });
const isDisabled = instance.getBoolean('Disabled');
const validationState = instance.getEnum('Validation State', {
  None: undefined,
  Success: 'success',
  Warning: 'warning',
  Danger: 'danger',
});

const hasLabel = instance.getBoolean('Label');
const isLabelHidden = !hasLabel;
const labelHandle = instance.findText('Label', { traverseInstances: true });
const label = hasLabel && labelHandle.type !== 'ERROR' ? labelHandle.textContent : 'Fill accessible label';

const showHelper = instance.getBoolean('Helper');
const helperHandle = instance.findText('Helper text', { traverseInstances: true });
const helperText = showHelper && helperHandle.type !== 'ERROR' ? helperHandle.textContent : undefined;

const validationTextHandle = instance.findText('Validation text', { traverseInstances: true });
const validationText =
  validationState && validationTextHandle.type !== 'ERROR' ? validationTextHandle.textContent : undefined;

export default {
  id: 'Select',
  imports: ["import { Select } from '@alma-oss/spirit-web-react';"],
  example: figma.code`
    <Select
      id="select-default"
      label="${label}"
      ${isLabelHidden ? 'isLabelHidden' : ''}
      ${isDisabled ? 'isDisabled' : ''}
      ${variant ? figma.code`variant="${variant}"` : ''}
      ${size ? figma.code`size="${size}"` : ''}
      ${helperText ? figma.code`helperText="${helperText}"` : ''}
      ${validationState ? figma.code`validationState="${validationState}"` : ''}
      ${validationText ? figma.code`validationText="${validationText}"` : ''}
    >
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
    </Select>`,
};
