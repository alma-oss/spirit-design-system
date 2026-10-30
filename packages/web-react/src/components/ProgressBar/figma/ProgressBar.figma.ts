// url=<FIGMA_FILE_ID>?node-id=49511%3A7619
// source=https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/ProgressBar/ProgressBar.tsx
// component=ProgressBar

import figma from 'figma';
import { getInstance } from '../../../figma/helpers';

const instance = getInstance();

const placement = instance.getEnum('Value placement', { None: 'none', Right: 'right', Bottom: 'bottom' });
const color = instance.getEnum('Color', {
  Informative: undefined,
  'Accent 01': 'accent01',
  Danger: 'danger',
  Success: 'success',
  Warning: 'warning',
});
const isDisabled = instance.getBoolean('Disabled');

const hasLabel = instance.getBoolean('Label');
const labelHandle = instance.findText('Label', { traverseInstances: true });
const label = hasLabel && labelHandle.type !== 'ERROR' ? labelHandle.textContent : 'Fill accessible label';

const showHelper = instance.getBoolean('Helper');
const helperHandle = instance.findText('Helper text', { traverseInstances: true });
const helperText = showHelper && helperHandle.type !== 'ERROR' ? helperHandle.textContent : undefined;

// Danger, Warning and Success variants show validation text; the state follows the color.
const validationTextHandle = instance.findText('Validation text', {
  traverseInstances: true,
  path: ['Validation text'],
});
const validationText = validationTextHandle.type !== 'ERROR' ? validationTextHandle.textContent : undefined;
const validationState = validationText ? color : undefined;

// The value caption exists only when a placement is set ("20%" or a custom text such as "4 out of 20 awards").
const valueHandle = instance.findText('Value', { traverseInstances: true });
const valueLabel = placement !== 'none' && valueHandle.type !== 'ERROR' ? valueHandle.textContent : undefined;
const percentage = valueLabel?.match(/^(\d+)\s*%$/)?.[1];
const value = percentage ?? '20';

export default {
  id: 'ProgressBar',
  imports: ["import { ProgressBar } from '@alma-oss/spirit-web-react';"],
  example: figma.code`
    <ProgressBar
      label="${label}"
      ${hasLabel ? '' : 'isLabelHidden'}
      value={${value}}
      ${valueLabel ? figma.code`valueLabel="${valueLabel}"` : ''}
      ${placement === 'bottom' ? 'valuePlacement="bottom"' : ''}
      ${color ? figma.code`color="${color}"` : ''}
      ${isDisabled ? 'isDisabled' : ''}
      ${helperText ? figma.code`helperText="${helperText}"` : ''}
      ${validationState ? figma.code`validationState="${validationState}"` : ''}
      ${validationText ? figma.code`validationText="${validationText}"` : ''}
    />`,
};
