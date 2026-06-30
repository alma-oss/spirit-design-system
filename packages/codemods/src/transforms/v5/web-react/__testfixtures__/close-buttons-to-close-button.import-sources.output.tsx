import React from 'react';
// @ts-ignore: No declaration -- The library is not installed; we don't need to install it for fixtures.
import { Modal, Tooltip, CloseButton } from '@org/design-system';
import { CloseButton as OtherCloseButton } from '@other/design-system';

export const MyModal = ({ id, isOpen, onClose }) => (
  <Modal id={id} isOpen={isOpen} onClose={onClose}>
    <CloseButton
      size="xlarge"
      aria-controls={id}
      aria-expanded={isOpen}
      onClick={onClose}
      label="Close">
      Close
    </CloseButton>
  </Modal>
);

export const MyTooltip = ({ onClose }) => (
  <Tooltip>
    <CloseButton aria-expanded="true" onClick={onClose} label="Close" />
    <OtherCloseButton label="Other" />
  </Tooltip>
);
