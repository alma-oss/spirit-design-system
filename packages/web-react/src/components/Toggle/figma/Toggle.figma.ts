// url=<FIGMA_FILE_ID>?node-id=19122%3A3329
// source=https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Toggle/Toggle.tsx
// component=Toggle

import figma from 'figma';
import { getInstance } from '../../../figma/helpers';

const instance = getInstance();

const labelHandle = instance.findText('Label');
const labelText = labelHandle.type !== 'ERROR' ? labelHandle.textContent : 'Label';
const isLabelHidden = !instance.getBoolean('Label');

const isChecked = instance.getEnum('Selected', { True: true, False: false });
const isDisabled = instance.getEnum('Disabled', { False: false, True: true });
const validationState = instance.getEnum('Validation State', {
  None: undefined,
  Warning: 'warning',
  Danger: 'danger',
  Success: 'success',
});

const showHelper = instance.getBoolean('Helper text');
const helperHandle = instance.findText('Helper text', { traverseInstances: true });
const helperText = showHelper && helperHandle.type !== 'ERROR' ? helperHandle.textContent : undefined;

const showDescription = instance.getBoolean('Description');
const descriptionHandle = instance.findText('Description');
const descriptionText =
  showDescription && descriptionHandle.type !== 'ERROR' ? descriptionHandle.textContent : undefined;

const showLink = instance.getBoolean('Link');
const linkHandle = instance.findText('Link');
const linkText = showLink && linkHandle.type !== 'ERROR' ? linkHandle.textContent : undefined;

let details;
if (showLink || showDescription) {
  details = figma.code`<>
      ${showLink ? figma.code`<Link href="#">${linkText}</Link>` : ''}
      ${showDescription ? figma.code`<span>${descriptionText}</span>` : ''}
    </>`;
}

export default {
  id: 'Toggle',
  imports: ["import { Link, Toggle } from '@alma-oss/spirit-web-react';"],
  example: figma.code`
    <Toggle
      id="toggle-example"
      label="${labelText}"
      ${isLabelHidden ? 'isLabelHidden' : ''}
      ${isChecked ? 'isChecked' : ''}
      ${isDisabled ? 'isDisabled' : ''}
      ${validationState ? figma.code`validationState="${validationState}"` : ''}
      ${helperText ? figma.code`helperText="${helperText}"` : ''}
      ${details ? figma.code`details={${details}}` : ''}
    />`,
};
