import React from 'react';
// @ts-ignore: No declaration -- The library is not installed; we don't need to install it for fixtures.
import { Drawer, DrawerPanel, Modal, Tooltip, CloseButton } from '@alma-oss/spirit-web-react';

export const MyDrawer = ({ id, isOpen, onClose }) => (
  <Drawer id={id} isOpen={isOpen} onClose={onClose}>
    <DrawerPanel closeButton={<CloseButton
      size="large"
      aria-expanded={TODO_drawerIsOpen}
      aria-controls={TODO_drawerId}
      onClick={TODO_drawerOnClose} />}>Drawer content</DrawerPanel>
  </Drawer>
);

export const MyModal = ({ id, isOpen, onClose }) => (
  <Modal id={id} isOpen={isOpen} onClose={onClose}>
    <CloseButton
      size="xlarge"
      aria-controls={id}
      aria-expanded={isOpen}
      onClick={onClose}
      label="Close" />
  </Modal>
);

export const MyTooltip = ({ onClose }) => (
  <Tooltip>
    <CloseButton aria-expanded="true" onClick={onClose} label="Close" />
  </Tooltip>
);
