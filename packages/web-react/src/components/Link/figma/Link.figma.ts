// url=<FIGMA_FILE_ID>?node-id=36800%3A19626
// source=https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Link/Link.tsx
// component=Link

import figma from 'figma';

const size = figma.selectedInstance.getEnum('Size', {
  XSmall: 'xsmall',
  Small: 'small',
  Medium: undefined,
  Large: 'large',
  XLarge: 'xlarge',
});
const color = figma.selectedInstance.getEnum('Color', {
  Primary: undefined,
  Secondary: 'secondary',
  Tertiary: 'tertiary',
  Success: 'success',
  Warning: 'warning',
  Danger: 'danger',
  Informative: 'informative',
});
const isDisabled = figma.selectedInstance.getEnum('Disabled', { False: false, True: true });

const example = figma.code`
  <Link
    ${size ? figma.code`size="${size}"` : ''}
    ${color ? figma.code`color="${color}"` : ''}
    ${isDisabled ? figma.code`isDisabled` : ''}
  >
    Link
  </Link>`;

export default {
  id: 'Link',
  imports: ["import { Link } from '@alma-oss/spirit-web-react';"],
  example,
  metadata: { nestable: true },
};
