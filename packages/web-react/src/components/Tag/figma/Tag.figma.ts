// url=<FIGMA_FILE_ID>?node-id=1980%3A4090
// source=https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Tag/Tag.tsx
// component=Tag

import figma from 'figma';
import { getInstance } from '../../../figma/helpers';

const instance = getInstance();

const labelText = instance.getString('Label Text');
const color = instance.getEnum('Color', {
  Neutral: undefined,
  Informative: 'informative',
  Success: 'success',
  Warning: 'warning',
  Danger: 'danger',
});
const isSubtle = instance.getEnum('Subtle', { False: undefined, True: true });
const size = instance.getEnum('Size', {
  XSmall: 'xsmall',
  Small: 'small',
  Medium: undefined,
  Large: 'large',
  XLarge: 'xlarge',
});

export default {
  id: 'Tag',
  imports: ["import { Tag } from '@alma-oss/spirit-web-react';"],
  example: figma.code`
    <Tag
      ${color ? figma.code`color="${color}"` : ''}
      ${isSubtle ? 'isSubtle' : ''}
      ${size ? figma.code`size="${size}"` : ''}
    >
      ${labelText}
    </Tag>`,
};
