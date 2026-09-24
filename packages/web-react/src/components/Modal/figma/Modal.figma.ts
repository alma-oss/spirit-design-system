// url=<FIGMA_FILE_ID>?node-id=44925%3A4925
// source=https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Modal/Modal.tsx
// component=Modal

import figma from 'figma';
import { getInstance } from '../../../figma/helpers';

const instance = getInstance();

const alignmentY = instance.getEnum('Alignment Y', { Center: undefined, Bottom: 'bottom' });
const isDockedOnMobile = instance.getBoolean('Docked On Mobile');

const hasTitle = instance.getBoolean('Title');
const titleText = hasTitle ? instance.getString('Title Text') : undefined;
const isDismissible = instance.getBoolean('Dismissible');

const hasDescription = instance.getBoolean('Description');
const descriptionText = hasDescription ? instance.getString('Description Text') : undefined;
const alignmentX = instance.getEnum('Alignment X', { Center: 'center', Right: undefined });

const bodyContent = instance.getSlot('Modal Body Slot');
const illustrationContent = instance.getSlot('Modal Body Illustration');

const button = instance.findInstance('Button', { traverseInstances: true });
let buttonCode;
if (button && button.type === 'INSTANCE') {
  buttonCode = button.executeTemplate().example;
}

export default {
  id: 'Modal',
  imports: ["import { Modal, ModalBody, ModalDialog, ModalFooter, ModalHeader } from '@alma-oss/spirit-web-react';"],
  example: figma.code`
    <Modal
      id="modal-example"
      isOpen
      onClose={() => {}}
      ${!hasTitle ? figma.code`aria-label="Accessible Modal Title"` : ''}
      ${alignmentY ? figma.code`alignmentY="${alignmentY}"` : ''}
    >
      <ModalDialog${isDockedOnMobile ? ' isDockedOnMobile' : ''}>
        <ModalHeader${!isDismissible ? ' hasCloseButton={false}' : ''}>${titleText}</ModalHeader>
        <ModalBody>
          ${bodyContent}
          ${illustrationContent}
        </ModalBody>
        <ModalFooter
          ${descriptionText ? figma.code`description="${descriptionText}"` : ''}
          ${alignmentX ? figma.code`alignmentX="${alignmentX}"` : ''}
        >
          ${buttonCode}
        </ModalFooter>
      </ModalDialog>
    </Modal>`,
};
