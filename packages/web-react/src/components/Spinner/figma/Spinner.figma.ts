// url=<FIGMA_FILE_ID>?node-id=11445%3A8917
// source=https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Spinner/Spinner.tsx
// component=Spinner

import figma from 'figma';
import { getInstance } from '../../../figma/helpers';

const instance = getInstance();

const color = instance.getEnum('Text Color', { Primary: undefined, Secondary: 'secondary' });

export default {
  id: 'Spinner',
  imports: ["import { Spinner } from '@alma-oss/spirit-web-react';"],
  example: figma.code`<Spinner${color ? figma.code` color="${color}"` : ''} />`,
};
