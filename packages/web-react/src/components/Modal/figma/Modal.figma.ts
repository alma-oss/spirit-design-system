// url=<FIGMA_FILE_ID>?node-id=44925%3A4925
// source=https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/components/Modal/Modal.tsx
// component=Modal

import figma from 'figma';
import { getInstance } from '../../../figma/helpers';

const instance = getInstance();

const alignmentY = instance.getEnum('Alignment Y', { Center: undefined, Bottom: 'bottom' });
const isDockedOnMobile = instance.getBoolean('Docked On Mobile');
const hasTitle = instance.getBoolean('Title');

const bodyContent = instance.getSlot('Modal Body Slot');
const illustrationContent = instance.getSlot('Modal Body Illustration');

const header = instance.findInstance('Subcomponent Modal Header', { traverseInstances: true });
let headerCode;
if (header && header.type === 'INSTANCE') {
  headerCode = header.executeTemplate().example;
}

const footer = instance.findInstance('Subcomponent Modal Footer', { traverseInstances: true });
let footerCode;
if (footer && footer.type === 'INSTANCE') {
  footerCode = footer.executeTemplate().example;
}

export default {
  id: 'Modal',
  imports: ["import { Modal, ModalBody, ModalDialog } from '@alma-oss/spirit-web-react';"],
  example: figma.code`
    <Modal
      id="modal-example"
      isOpen
      onClose={() => {}}
      ${!hasTitle ? figma.code`aria-label="Accessible Modal Title"` : ''}
      ${alignmentY ? figma.code`alignmentY="${alignmentY}"` : ''}
    >
      <ModalDialog${isDockedOnMobile ? ' isDockedOnMobile' : ''}>
        ${headerCode}
        <ModalBody>
          ${bodyContent}
          ${illustrationContent}
        </ModalBody>
        ${footerCode}
      </ModalDialog>
    </Modal>`,
};
