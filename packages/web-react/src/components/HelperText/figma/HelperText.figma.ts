// url=<FIGMA_FILE_ID>?node-id=26437%3A2042
// source=https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/HelperText/HelperText.tsx
// component=HelperText

import figma from 'figma';

const message = figma.selectedInstance.getString('Message');

export default {
  id: 'HelperText',
  imports: ["import { HelperText } from '@alma-oss/spirit-web-react';"],
  example: figma.code`<HelperText helperText="${message}" />`,
};
