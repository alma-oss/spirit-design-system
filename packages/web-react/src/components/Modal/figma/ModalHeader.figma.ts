// url=<FIGMA_FILE_ID>?node-id=9314%3A4046
// source=https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Modal/ModalHeader.tsx
// component=ModalHeader

import figma from 'figma';
import { getInstance } from '../../../figma/helpers';

const instance = getInstance();

const hasTitle = instance.getBoolean('Title');
const titleText = hasTitle ? instance.getString('Title Text') : undefined;
const isDismissible = instance.getBoolean('Dismissible');

export default {
  id: 'ModalHeader',
  imports: ["import { ModalHeader } from '@alma-oss/spirit-web-react';"],
  example: figma.code`<ModalHeader${isDismissible === false ? ' hasCloseButton={false}' : ''}>${titleText}</ModalHeader>`,
  metadata: {
    nestable: true,
  },
};
