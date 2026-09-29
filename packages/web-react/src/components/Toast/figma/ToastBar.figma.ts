// url=<FIGMA_FILE_ID>?node-id=17002%3A1346
// source=https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Toast/ToastBar.tsx
// component=ToastBar

import figma from 'figma';
import { getInstance } from '../../../figma/helpers';

const instance = getInstance();

const color = instance.getEnum('Color', {
  Neutral: undefined,
  Informative: 'informative',
  Success: 'success',
  Warning: 'warning',
  Danger: 'danger',
});
const hasIcon = instance.getBoolean('Icon');
const isDismissible = instance.getBoolean('Dismissible');

const layoutType = instance.getPropertyValue('Layout Type');
const shortText = instance.getString('Text Short');
const longText = instance.getString('Description Text');
const text = layoutType === 'More Text Lines' ? longText : shortText;

const hasAction = instance.getBoolean('Action');
const actionText = hasAction ? instance.getString('Action Text') : undefined;

export default {
  id: 'ToastBar',
  imports: ["import { ToastBar, ToastBarLink, ToastBarMessage } from '@alma-oss/spirit-web-react';"],
  example: figma.code`
    <ToastBar
      id="toast-bar-example"
      ${color ? figma.code`color="${color}"` : ''}
      ${hasIcon ? 'hasIcon' : ''}
      ${isDismissible ? 'isDismissible' : ''}
    >
      <ToastBarMessage>${text}</ToastBarMessage>
      ${actionText ? figma.code`<ToastBarLink href="#">${actionText}</ToastBarLink>` : ''}
    </ToastBar>`,
};
