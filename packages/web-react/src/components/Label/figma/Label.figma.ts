// url=<FIGMA_FILE_ID>?node-id=26437%3A2180
// source=https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Label/Label.tsx
// component=Label

import figma from 'figma';
import { getInstance } from '../../../figma/helpers';

const instance = getInstance();

const children = instance.getString('Label');
const isRequired = instance.getBoolean('Required');
const isDisabled = instance.getEnum('Disabled', { False: false, True: true });

export default {
  id: 'Label',
  imports: ["import { Label } from '@alma-oss/spirit-web-react';"],
  example: figma.code`<Label${isDisabled ? ' isDisabled' : ''}>${children}${isRequired ? ' *' : ''}</Label>`,
};
