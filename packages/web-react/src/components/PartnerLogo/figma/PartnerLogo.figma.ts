// url=<FIGMA_FILE_ID>?node-id=19750%3A16047
// source=https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/PartnerLogo/PartnerLogo.tsx
// component=PartnerLogo

import figma from 'figma';
import { getInstance } from '../../../figma/helpers';

const instance = getInstance();

const size = instance.getEnum('Size', { Large: 'large', Medium: undefined, Small: 'small' });

export default {
  id: 'PartnerLogo',
  imports: ["import { PartnerLogo } from '@alma-oss/spirit-web-react';"],
  example: figma.code`<PartnerLogo${size ? figma.code` size="${size}"` : ''}>Logo Placeholder</PartnerLogo>`,
};
