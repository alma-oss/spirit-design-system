// url=<FIGMA_FILE_ID>?node-id=9314%3A4148
// source=https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Modal/ModalFooter.tsx
// component=ModalFooter

import figma from 'figma';
import { getInstance } from '../../../figma/helpers';

const instance = getInstance();

const hasDescription = instance.getBoolean('Description');
const descriptionText = hasDescription ? instance.getString('Description Text') : undefined;
const alignmentX = instance.getEnum('Alignment X', { Left: 'left', Center: 'center', Right: undefined });

const button = instance.findInstance('Button', { traverseInstances: true });
let buttonCode;
if (button && button.type === 'INSTANCE') {
  buttonCode = button.executeTemplate().example;
}

export default {
  id: 'ModalFooter',
  imports: ["import { ModalFooter } from '@alma-oss/spirit-web-react';"],
  example: figma.code`
    <ModalFooter
      ${descriptionText ? figma.code`description="${descriptionText}"` : ''}
      ${alignmentX ? figma.code`alignmentX="${alignmentX}"` : ''}
    >
      ${buttonCode}
    </ModalFooter>`,
  metadata: {
    nestable: true,
  },
};
