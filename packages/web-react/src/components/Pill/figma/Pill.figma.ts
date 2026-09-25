// url=<FIGMA_FILE_ID>?node-id=4353%3A4437
// source=https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Pill/Pill.tsx
// component=Pill

import figma from 'figma';
import { getInstance } from '../../../figma/helpers';

const instance = getInstance();

const color = instance.getEnum('Color', {
  Selected: undefined,
  Neutral: 'neutral',
  Informative: 'informative',
  Success: 'success',
  Warning: 'warning',
  Danger: 'danger',
  Disabled: undefined,
});
const isSubtle = instance.getEnum('Subtle', { False: undefined, True: true });

const placeholder = instance.findText('Placeholder');
const children = placeholder.type !== 'ERROR' ? placeholder.textContent : undefined;

export default {
  id: 'Pill',
  imports: ["import { Pill } from '@alma-oss/spirit-web-react';"],
  example: figma.code`
    <Pill
      ${color ? figma.code`color="${color}"` : ''}
      ${isSubtle ? 'isSubtle' : ''}
    >
      ${children}
    </Pill>`,
};
