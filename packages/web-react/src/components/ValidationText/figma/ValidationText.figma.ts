// url=<FIGMA_FILE_ID>?node-id=26437%3A2033
// source=https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/ValidationText/ValidationText.tsx
// component=ValidationText

import figma from 'figma';
import { getInstance } from '../../../figma/helpers';

const instance = getInstance();

const validationText = instance.getString('Message');
const hasIcon = instance.getBoolean('Icon');
const validationStateIcon = hasIcon
  ? instance.getEnum('Type', { Danger: 'danger', Warning: 'warning', Success: 'success' })
  : undefined;

export default {
  id: 'ValidationText',
  imports: ["import { ValidationText } from '@alma-oss/spirit-web-react';"],
  example: figma.code`
    <ValidationText
      validationText="${validationText}"
      ${validationStateIcon ? figma.code`validationStateIcon="${validationStateIcon}"` : ''}
    />`,
};
