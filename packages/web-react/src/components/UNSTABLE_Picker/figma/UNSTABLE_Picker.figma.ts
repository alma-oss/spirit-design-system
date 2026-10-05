// url=<FIGMA_FILE_ID>?node-id=42931%3A8174
// source=https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/UNSTABLE_Picker/UNSTABLE_UncontrolledPicker.tsx
// component=UNSTABLE_Picker

import figma from 'figma';
import { getInstance } from '../../../figma/helpers';

const instance = getInstance();

const size = instance.getEnum('Size', { Small: 'small', Medium: undefined, Large: 'large' });
const isDisabled = instance.getBoolean('Disabled');
const isOpen = instance.getEnum('Open', { False: false, True: true });
const validationState = instance.getEnum('Validation State', {
  None: undefined,
  Success: 'success',
  Warning: 'warning',
  Danger: 'danger',
});

// Interaction State drives the selection: Filled = one selected tag, Multiple Tags = several, Aggregated = summary tag.
const interactionState = instance.getEnum('Interaction State', {
  Default: 'default',
  Filled: 'filled',
  'Multiple Tags': 'multiple',
  'Aggregated Tags': 'aggregated',
});
const SELECTED_KEYS: Record<string, string | undefined> = {
  default: undefined,
  filled: "['option-1']",
  multiple: "['option-1', 'option-2']",
  aggregated: "['option-1', 'option-2']",
};
const defaultSelectedKeys = interactionState ? SELECTED_KEYS[interactionState] : undefined;
const isAggregated = interactionState === 'aggregated';

const hasLabel = instance.getBoolean('Label');
const isLabelHidden = !hasLabel;
const labelHandle = instance.findText('Label', { traverseInstances: true });
const label = hasLabel && labelHandle.type !== 'ERROR' ? labelHandle.textContent : 'Fill accessible label';

const showHelper = instance.getBoolean('Helper');
const helperHandle = instance.findText('Helper text', { traverseInstances: true });
const helperText = showHelper && helperHandle.type !== 'ERROR' ? helperHandle.textContent : undefined;

const validationTextHandle = instance.findText('Validation text', {
  traverseInstances: true,
  path: ['Validation text'],
});
const validationText =
  validationState && validationTextHandle.type !== 'ERROR' ? validationTextHandle.textContent : undefined;

export default {
  id: 'UNSTABLE_Picker',
  imports: [
    "import { UNSTABLE_UncontrolledPicker, UNSTABLE_PickerGroup, UNSTABLE_PickerItem } from '@alma-oss/spirit-web-react';",
  ],
  example: figma.code`
    <UNSTABLE_UncontrolledPicker
      id="picker-default"
      label="${label}"
      ${isLabelHidden ? 'isLabelHidden' : ''}
      ${isDisabled ? 'isDisabled' : ''}
      ${isAggregated ? 'isAggregated' : ''}
      ${isOpen ? 'defaultIsOpen' : ''}
      ${defaultSelectedKeys ? figma.code`defaultSelectedKeys={${defaultSelectedKeys}}` : ''}
      ${size ? figma.code`size="${size}"` : ''}
      ${helperText ? figma.code`helperText="${helperText}"` : ''}
      ${validationState ? figma.code`validationState="${validationState}"` : ''}
      ${validationText ? figma.code`validationText="${validationText}"` : ''}
    >
      <UNSTABLE_PickerGroup label="Options">
        <UNSTABLE_PickerItem value="option-1">Option 1</UNSTABLE_PickerItem>
        <UNSTABLE_PickerItem value="option-2">Option 2</UNSTABLE_PickerItem>
      </UNSTABLE_PickerGroup>
    </UNSTABLE_UncontrolledPicker>`,
};
