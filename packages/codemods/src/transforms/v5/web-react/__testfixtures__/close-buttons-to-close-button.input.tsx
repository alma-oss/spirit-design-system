import React from 'react';
// @ts-ignore: No declaration -- The library is not installed; we don't need to install it for fixtures.
import { Drawer, DrawerCloseButton, DrawerPanel, Modal, ModalCloseButton, Tooltip, TooltipCloseButton } from '@alma-oss/spirit-web-react';

export const MyDrawer = ({ id, isOpen, onClose }) => (
  <Drawer id={id} isOpen={isOpen} onClose={onClose}>
    <DrawerPanel closeButton={<DrawerCloseButton />}>Drawer content</DrawerPanel>
  </Drawer>
);

export const MyModal = ({ id, isOpen, onClose }) => (
  <Modal id={id} isOpen={isOpen} onClose={onClose}>
    <ModalCloseButton id={id} isOpen={isOpen} onClose={onClose} label="Close" />
  </Modal>
);

export const MyTooltip = ({ onClose }) => (
  <Tooltip>
    <TooltipCloseButton onClick={onClose} label="Close" />
  </Tooltip>
);
