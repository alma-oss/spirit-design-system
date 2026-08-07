// url=https://www.figma.com/design/w9Ca4hvkuYLshsrHu1bYwT/SPIRIT-DESIGN-SYSTEM--UI-Kit-?node-id=830%3A292
// source=https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Checkbox/Checkbox.tsx
// component=Checkbox

import figma from 'figma';
import { getInstance } from '../../../figma/helpers';

const instance = getInstance();

const labelText = instance.getString('Label Text');
const descriptionText = instance.getString('Description Text');
const linkText = instance.getString('Link Text');
const isChecked = instance.getEnum('Selected', { False: false, True: true });
const isDisabled = instance.getEnum('Disabled', { False: false, True: true });
const indeterminate = instance.getEnum('Indeterminate', { False: false, True: true });
const validationState = instance.getEnum('Validation State', {
  None: undefined,
  Success: 'success',
  Warning: 'warning',
  Danger: 'danger',
});
const showHelperText = instance.getBoolean('Helper text');
const showDescription = instance.getBoolean('Description');
const showLabel = instance.getBoolean('Label');
const showLink = instance.getBoolean('Link');
const showValidationText = instance.getBoolean('Validation text');

export default {
  id: 'Checkbox',
  imports: ["import { Checkbox } from '@alma-oss/spirit-web-react';"],
  example: figma.code`
    <Checkbox
      id="checkbox-default"
      name="checkboxDefault"
      ${showLabel ? '' : 'isLabelHidden'}
      label="${labelText}"
      ${isChecked ? 'isChecked' : ''}
      ${isDisabled ? 'isDisabled' : ''}
      ${indeterminate ? 'isIndeterminate' : ''}
      ${validationState ? figma.code`validationState="${validationState}"` : ''}
      ${showHelperText ? 'helperText="Helper text"' : ''}
      ${showValidationText ? 'validationText="Validation text"' : ''}
      ${
        showDescription || showLink
          ? figma.code`
            details={<>
              ${showDescription ? figma.code`<span>${descriptionText}</span>` : ''}
              ${showLink ? figma.code`<a href="#">${linkText}</a>` : ''}
            </>}`
          : ''
      }
    />`,
};
