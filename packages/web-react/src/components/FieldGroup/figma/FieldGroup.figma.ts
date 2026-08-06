// url=<FIGMA_FILE_ID>?node-id=12858%3A10625
// source=https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/FieldGroup/FieldGroup.tsx
// component=FieldGroup

import figma from 'figma';
import { getInstance } from '../../../figma/helpers';

const instance = getInstance();

const contentSlot = instance.getSlot('Content Slot');
const isDisabled = instance.getEnum('Disabled', { False: false, True: true });
const validationState = instance.getEnum('Validation State', {
  Default: undefined,
  Success: 'success',
  Warning: 'warning',
  Danger: 'danger',
});
const showHelperText = instance.getBoolean('Helper');

export default {
  id: 'FieldGroup',
  imports: ["import { Checkbox, FieldGroup } from '@alma-oss/spirit-web-react';"],
  example: figma.code`<FieldGroup
  id="fieldgroup-example"
  label="Field Group Label"
  ${isDisabled ? 'isDisabled' : ''}
  ${validationState ? figma.code`validationState="${validationState}"` : ''}
  ${showHelperText ? 'helperText="Helper text"' : ''}
>
  ${contentSlot}
</FieldGroup>`,
};
