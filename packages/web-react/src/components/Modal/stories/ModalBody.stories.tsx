import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { type ModalBodyProps } from '../../../types';
import { Button } from '../../Button';
import { Modal, ModalBody, ModalDialog, ModalFooter, ModalHeader } from '..';

const meta: Meta<typeof ModalBody> = {
  title: 'Components/Modal',
  component: ModalBody,
  argTypes: {
    children: {
      control: 'text',
    },
  },
  args: {
    children: 'Body',
  },
};

export default meta;
type Story = StoryObj<typeof ModalBody>;

const ModalWithHooks = (args: ModalBodyProps) => {
  const [isOpen, setOpen] = useState(true);

  const toggleModal = () => setOpen(!isOpen);

  const handleClose = () => {
    setOpen(false);
  };

  const { children } = args;

  return (
    <>
      <Button onClick={toggleModal} aria-expanded={isOpen}>
        Open Modal
      </Button>
      <Modal id="modal" isOpen={isOpen} onClose={handleClose}>
        <ModalDialog>
          <ModalHeader>Modal Header</ModalHeader>
          <ModalBody {...args}>{children}</ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={handleClose}>
              Confirm
            </Button>
            <Button color="tertiary" onClick={handleClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalDialog>
      </Modal>
    </>
  );
};

/**
 *
 */
export const ModalBodyPlayground: Story = {
  name: 'ModalBody',
  render: (args) => <ModalWithHooks {...args} />,
};
