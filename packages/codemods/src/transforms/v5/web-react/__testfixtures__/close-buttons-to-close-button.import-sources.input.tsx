import React from 'react';
// @ts-ignore: No declaration -- The library is not installed; we don't need to install it for fixtures.
import {
  Modal,
  ModalCloseButton as ModalDismissButton,
  Tooltip,
  TooltipCloseButton as TooltipDismissButton,
} from '@org/design-system';
import { CloseButton as OtherCloseButton } from '@other/design-system';

export const MyModal = ({ id, isOpen, onClose }) => (
  <Modal id={id} isOpen={isOpen} onClose={onClose}>
    <ModalDismissButton id={id} isOpen={isOpen} onClose={onClose} label="Close">
      Close
    </ModalDismissButton>
  </Modal>
);

export const MyTooltip = ({ onClose }) => (
  <Tooltip>
    <TooltipDismissButton onClick={onClose} label="Close" />
    <OtherCloseButton label="Other" />
  </Tooltip>
);
